const shader = `
precision mediump float;
uniform vec2 resolution;
uniform vec2 offset;

#define PI 3.14159265359

vec3 colorA=vec3(0.,0.,0.);
vec3 colorB=vec3(1.,1.,1.);

float plot(vec2 st,float pct){
    return smoothstep(pct-.01,pct,st.y)-smoothstep(pct,pct+.01,st.y);
}

void main(){
    vec2 st=(gl_FragCoord.xy-offset)/resolution;
    
    vec3 pct=vec3(st.x);
    
    pct.r = smoothstep(0.0,1.0, st.x);
    pct.g = sin(st.x*PI);
    pct.b = pow(st.x,0.5);
    
    vec3 color=mix(colorA,colorB,pct);
    
    // Plot transition lines for each channel
    color=mix(color,vec3(1.,0.,0.),plot(st,pct.r));
    color=mix(color,vec3(0.,1.,0.),plot(st,pct.g));
    color=mix(color,vec3(0.,0.,1.),plot(st,pct.b));
    
    gl_FragColor=vec4(color,1.);
}
`;

export default shader;
