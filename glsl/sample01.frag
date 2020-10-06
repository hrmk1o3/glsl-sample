// https://thebookofshaders.com/05/?lan=jp

uniform vec2 resolution;
uniform vec2 offset;
uniform float time;

float plot(vec2 st,float pct){
    return smoothstep(pct-.02,pct,st.y)-smoothstep(pct,pct+.02,st.y);
}

void main(){
    vec2 uv=(gl_FragCoord.xy-offset)/resolution;
    
    // Smooth interpolation between 0.1 and 0.9
    float y=smoothstep(.1,.9,uv.x);
    
    vec3 backgroundColor=vec3(y, y, y);
    vec3 plotColor = vec3(0.,1.,0.);
    
    float pct=plot(uv,y);
    vec3 color=(1.-pct)*backgroundColor+pct*plotColor;
    
    gl_FragColor=vec4(color,1.);
}