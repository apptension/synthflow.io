uniform float u_time;
uniform float u_envelope;
uniform float u_meter;

void main() {
    gl_FragColor = vec4(1. - abs(u_meter) / 120. * 3.);
}
