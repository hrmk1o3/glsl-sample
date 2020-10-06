// https://github.com/fand/react-vfx/blob/master/src/constants.ts

precision mediump float;
uniform vec2 resolution;
uniform vec2 offset;
uniform float time;
uniform sampler2D src;
void main(){
    vec2 uv=(gl_FragCoord.xy-offset)/resolution;
    gl_FragColor=vec4(uv,sin(time)*.5+.5,1);
    vec4 img=texture2D(src,uv);
    gl_FragColor*=smoothstep(0.,1.,img.a);
}
