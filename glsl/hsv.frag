precision mediump float;
uniform vec2 resolution;
uniform vec2 offset;
uniform float time;
uniform sampler2D src;

vec3 hsv(float h,float s,float v){
    vec4 t=vec4(1.,2./3.,1./3.,3.);
    vec3 p=abs(fract(vec3(h)+t.xyz)*6.-vec3(t.w));
    return v*mix(vec3(t.x),clamp(p-vec3(t.x),0.,1.),s);
}

void main(){
    vec2 uv=(gl_FragCoord.xy-offset)/resolution;
    vec4 img=texture2D(src,uv);
    float h=abs(mod(time*180.,360.)/360.);
    gl_FragColor=img*vec4(hsv(h,1.,1.),.6);
}