varying float qnoise;
varying vec2 vUv;
varying float displacement;
uniform float u_time;
uniform float u_envelope;

varying vec3 vecPos;
varying vec3 vecNormal;

void main(void) {
    vec3 light = vec3(0.);
    vec3 skyColor = vec3(1., 1., 0.7);
    vec3 groundColor = vec3(0.5, 0.3, 0.7);
    vec3 color =  vec3(qnoise*qnoise);
    vec3 lightDirection = normalize(vec3(0.7, -2., 1.2));

    light = mix(skyColor, groundColor, dot(lightDirection, vecNormal));
    light += dot(lightDirection, color);
    gl_FragColor = vec4(light, 1.);
}