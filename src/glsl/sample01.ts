const shader = `
precision mediump float;
uniform vec2 resolution;
uniform vec2 offset;
uniform float time;
uniform sampler2D src;

float lg_not(float x) {
    return 1. - x;
}

float lg_and(float x, float y) {
    return x * y;
}

float lg_nand(float x, float y) {
    return lg_not(lg_and(x, y));
}

float lg_nor(float x, float y) {
    return lg_and(lg_not(x), lg_not(y));
}

float lg_or(float x, float y) {
    return lg_not(lg_nor(x, y));
}

float rect(float left, float bottom, float right, float top, vec2 st) {
    vec2 lb = step(vec2(left, bottom),st);
    vec2 rt = step(vec2(1.-right, 1.-top),vec2(1.)-st);
    return lb.x*lb.y*rt.x*rt.y;
}

vec3 hsv(float h,float s,float v){
    vec4 t=vec4(1.,2./3.,1./3.,3.);
    vec3 p=abs(fract(vec3(h)+t.xyz)*6.-vec3(t.w));
    return v*mix(vec3(t.x),clamp(p-vec3(t.x),0.,1.),s);
}

vec3 color_mapping(float r) {
    return hsv(fract(r + .1), .8, 1.);
}

const float SPEED = -2.;
const float WIDTH = 0.1;
const float KIND = 7.;

void main(){
    vec2 st = (gl_FragCoord.xy - offset)/resolution.xy;

    vec3 pct = vec3(0.);
    for (int i = 0; i < int(ceil(1. / WIDTH) + 1.); i++) {
        float d = time * SPEED;
        float u = fract(d) + float(i) - .5;
        float u1 = u - .5;
        float u2 = u + .5;
        float s1 = max(0., u1*WIDTH);
        float s2 = min(u2*WIDTH, 1.);
        vec3 color = color_mapping((floor(d) - float(i))/KIND);
        vec3 mask = vec3(1.);
        // mask *= rect(s1, 0., s2, 1., st);
        mask *= rect(.5-s2, .5-s2, .5+s2, .5+s2, st);
        mask *= 1. - rect(.5-s1, .5-s1, .5+s1, .5+s1, st);
        pct += mask * color;
    }

    gl_FragColor = vec4(pct,1.0);
}
`;

export default shader;
