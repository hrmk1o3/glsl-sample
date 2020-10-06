const shader = `
#define PI 3.14159265359

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

float plot(vec2 st,float pct){
  return smoothstep(pct-.02,pct,st.y)-
  smoothstep(pct,pct+.02,st.y);
}

void main(){
  vec2 st=gl_FragCoord.xy/resolution;
  
  // Smooth interpolation between 0.1 and 0.9
  float y=smoothstep(.1,.9,st.x);
  
  vec3 color=vec3(y);
  
  float pct=plot(st,y);
  color=(1.-pct)*color+pct*vec3(0.,1.,0.);
  
  gl_FragColor=vec4(color,1.);
}
`;

export default shader;
