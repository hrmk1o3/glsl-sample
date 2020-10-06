const shader = `
// https://github.com/fand/react-vfx/README.md

uniform vec2 resolution;
uniform vec2 offset;
uniform float time;
uniform sampler2D src;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    gl_FragColor = texture2D(src, uv) * step(.5, fract(time));
}
`;

export default shader;
