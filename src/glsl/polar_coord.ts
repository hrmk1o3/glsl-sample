const shader = `
precision mediump float;
uniform vec2 resolution;
uniform vec2 offset;
uniform float time;
uniform sampler2D src;

#define PI 3.14159265359

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb(vec3 c){
    vec3 rgb=clamp(abs(mod(c.x*6.+vec3(0.,4.,2.),6.)-3.)-1.,0.,1.);
    rgb=rgb*rgb*(3.-2.*rgb);
    return c.z*mix(vec3(1.),rgb,c.y);
}

float shaping(float x){
    return sin(x*PI/2.);
}

void main(){
    vec2 st=(gl_FragCoord.xy-offset)/resolution;
    
    // Use polar coordinates instead of cartesian
    vec2 toCenter=vec2(.5)-st;
    float angle=atan(toCenter.y,toCenter.x);
    float radian=(angle/2./PI)+.5;
    float radius=length(toCenter)*2.;

    // Map the angle (-PI to PI) to the Hue (from 0 to 1)
    // and the Saturation to the radius
    radian = shaping(radian);
    vec3 color=hsb2rgb(vec3(radian,radius,1.));
    
    gl_FragColor=vec4(color,1.);
}
`;

export default shader;
