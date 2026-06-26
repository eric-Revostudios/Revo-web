/* ===========================================================
   REVO — "Fluid" shader background (reutilizable)
   Reaprovecha el wallpaper Fluid de REVO OS. Monta el shader
   en cada <canvas class="fluid-gl">. Ratón relativo al canvas
   + ripples al hacer clic en su contenedor.
   =========================================================== */
(function(){
  const canvases = [...document.querySelectorAll('canvas.fluid-gl')];
  if(!canvases.length) return;
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

  const PALETTES = {
    blue:{ c0:'vec3(0.039,0.071,0.220)', c1:'vec3(0.086,0.141,0.373)', c2:'vec3(0.211,0.314,0.812)', c3:'vec3(0.408,0.506,0.988)', c4:'vec3(0.557,0.627,1.000)', ha:'vec3(0.35,0.45,0.7)', hb:'vec3(0.5,0.6,1.0)' },
    red:{ c0:'vec3(0.140,0.020,0.030)', c1:'vec3(0.330,0.055,0.060)', c2:'vec3(0.720,0.160,0.140)', c3:'vec3(0.940,0.330,0.250)', c4:'vec3(1.000,0.520,0.420)', ha:'vec3(0.70,0.30,0.22)', hb:'vec3(1.0,0.55,0.4)' }
  };

  function buildFrag(p){ return `
precision highp float;
uniform float uTime; uniform vec2 uRes; uniform vec2 uMouse;
uniform vec3 uRipple[8]; uniform int uRippleN;
float hash(vec2 p){ p=fract(p*vec2(123.34,345.45)); p+=dot(p,p+34.345); return fract(p.x*p.y); }
float noise(vec2 p){ vec2 i=floor(p),f=fract(p); float a=hash(i),b=hash(i+vec2(1.,0.)),c=hash(i+vec2(0.,1.)),d=hash(i+vec2(1.,1.)); vec2 u=f*f*(3.-2.*f); return mix(mix(a,b,u.x),mix(c,d,u.x),u.y); }
float fbm(vec2 p){ float v=0.,a=.5; for(int i=0;i<6;i++){ v+=a*noise(p); p*=2.02; a*=.5; } return v; }
vec3 pal(float t){
  vec3 c0=${p.c0}; vec3 c1=${p.c1}; vec3 c2=${p.c2}; vec3 c3=${p.c3}; vec3 c4=${p.c4};
  t=clamp(t,0.,1.);
  if(t<0.25) return mix(c0,c1,t/0.25);
  if(t<0.5)  return mix(c1,c2,(t-0.25)/0.25);
  if(t<0.75) return mix(c2,c3,(t-0.5)/0.25);
  return mix(c3,c4,(t-0.75)/0.25);
}
float aspect(){ return uRes.x/uRes.y; }
float ripples(vec2 uv){
  float s=0.;
  for(int i=0;i<8;i++){
    if(i>=uRippleN) break;
    vec3 r=uRipple[i]; float age=uTime-r.z;
    if(age<0.0 || age>3.0) continue;
    vec2 d=uv-r.xy; d.x*=aspect();
    float dist=length(d); float radius=age*0.55;
    s+=exp(-pow((dist-radius)*9.0,2.0))*(1.0-age/3.0);
  }
  return s;
}
vec3 render(vec2 uv){
  vec2 p=uv; p.x*=aspect();
  vec2 m=uMouse; m.x*=aspect();
  float t=uTime*0.06;
  vec2 q=vec2(fbm(p*2.0+t), fbm(p*2.0-t+5.2));
  vec2 warp=p*3.0+q*2.2;
  float md=length(p-m);
  warp+=(p-m)*0.9*exp(-md*2.2);
  float n=fbm(warp+vec2(t*2.0,t));
  n+=ripples(uv)*0.6;
  vec3 col=pal(n*0.92+0.04);
  col+=ripples(uv)*${p.ha};
  col+=exp(-md*3.0)*0.10*${p.hb};
  return col;
}
void main(){ vec2 uv=gl_FragCoord.xy/uRes; gl_FragColor=vec4(render(uv),1.0); }`; }
  const VERT = `attribute vec2 aPos; void main(){ gl_Position=vec4(aPos,0.0,1.0); }`;

  function initFluid(canvas){
    const gl = canvas.getContext('webgl', { antialias:true, premultipliedAlpha:false, powerPreference:'low-power' });
    if(!gl){ canvas.style.display='none'; return; }
    const host = canvas.closest('.footer--fluid') || canvas.closest('section') || canvas.parentElement;
    const FRAG = buildFrag(PALETTES[canvas.dataset.palette] || PALETTES.blue);
    function sh(type,src){ const s=gl.createShader(type); gl.shaderSource(s,src); gl.compileShader(s);
      if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s)); return s; }
    const prog=gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if(!gl.getProgramParameter(prog,gl.LINK_STATUS)){ console.error(gl.getProgramInfoLog(prog)); canvas.style.display='none'; return; }
    gl.useProgram(prog);
    const vbo=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1, 3,-1, -1,3]),gl.STATIC_DRAW);
    const ap=gl.getAttribLocation(prog,'aPos'); gl.enableVertexAttribArray(ap); gl.vertexAttribPointer(ap,2,gl.FLOAT,false,0,0);
    const L={ uTime:gl.getUniformLocation(prog,'uTime'), uRes:gl.getUniformLocation(prog,'uRes'),
      uMouse:gl.getUniformLocation(prog,'uMouse'), uRipple:gl.getUniformLocation(prog,'uRipple[0]'), uRippleN:gl.getUniformLocation(prog,'uRippleN') };

    let DPR=Math.min(devicePixelRatio||1, 1.6);
    function resize(){ DPR=Math.min(devicePixelRatio||1, 1.6);
      const w=canvas.clientWidth||host.clientWidth, h=canvas.clientHeight||host.clientHeight;
      canvas.width=Math.max(2,Math.floor(w*DPR)); canvas.height=Math.max(2,Math.floor(h*DPR));
      gl.viewport(0,0,canvas.width,canvas.height); }
    if(window.ResizeObserver){ new ResizeObserver(resize).observe(canvas); }
    addEventListener('resize',resize); resize();

    let mx=0.5,my=0.5,tmx=0.5,tmy=0.5;
    host.addEventListener('pointermove',e=>{ const r=canvas.getBoundingClientRect(); tmx=(e.clientX-r.left)/r.width; tmy=1.0-(e.clientY-r.top)/r.height; });
    const rip=[];
    host.addEventListener('pointerdown',e=>{ if(e.target.closest('a,button')) return; const r=canvas.getBoundingClientRect();
      rip.push({x:(e.clientX-r.left)/r.width, y:1.0-(e.clientY-r.top)/r.height, t:tNow}); while(rip.length>8) rip.shift(); });

    let visible=true;
    if(window.IntersectionObserver){ new IntersectionObserver(es=>{ visible=es[0].isIntersecting; },{threshold:0.01}).observe(host); }

    let tNow=0; const start=performance.now(); const rbuf=new Float32Array(24);
    function frame(){
      requestAnimationFrame(frame);
      if(!visible) return;
      tNow=(performance.now()-start)/1000;
      if(reduce) tNow=8.0;
      mx+=(tmx-mx)*0.07; my+=(tmy-my)*0.07;
      for(let i=rip.length-1;i>=0;i--){ if(tNow-rip[i].t>3.0) rip.splice(i,1); }
      gl.uniform1f(L.uTime,tNow); gl.uniform2f(L.uRes,canvas.width,canvas.height); gl.uniform2f(L.uMouse,mx,my);
      const n=Math.min(rip.length,8);
      for(let i=0;i<8;i++){ const r=rip[i]; rbuf[i*3]=r?r.x:0; rbuf[i*3+1]=r?r.y:0; rbuf[i*3+2]=r?r.t:-99; }
      gl.uniform3fv(L.uRipple,rbuf); gl.uniform1i(L.uRippleN,n);
      gl.drawArrays(gl.TRIANGLES,0,3);
    }
    requestAnimationFrame(frame);
  }

  canvases.forEach(initFluid);
})();
