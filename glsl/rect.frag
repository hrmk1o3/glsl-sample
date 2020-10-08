precision mediump float;
uniform vec2 resolution;
uniform vec2 offset;

void main(){
    vec2 st = (gl_FragCoord.xy - offset)/resolution.xy;
    vec3 color = vec3(0.0);

    // Each result will return 1.0 (white) or 0.0 (black).
    // float left = step(0.1,st.x);   // Similar to ( X greater than 0.1 )
    // float bottom = step(0.1,st.y); // Similar to ( Y greater than 0.1 )
    vec2 lb = smoothstep(vec2(0.05), vec2(0.1),st);
    vec2 rt = smoothstep(vec2(0.05), vec2(0.1),vec2(1.)-st);
    float pct = lb.x * lb.y * rt.x * rt.y;

    // The multiplication of left*bottom will be similar to the logical AND.
    color = vec3( pct );

    gl_FragColor = vec4(color,1.0);
}
