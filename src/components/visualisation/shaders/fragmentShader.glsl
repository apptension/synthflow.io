uniform float u_time;

void main() {
    gl_FragColor = vec4(sin(u_time / 10.), 1.0, 0, 1.);
}
