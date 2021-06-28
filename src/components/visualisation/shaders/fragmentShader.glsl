varying float qnoise;
varying vec3 vecNormal;
varying float displacement;

uniform float u_reverb;
uniform float u_filter;
uniform float u_envelope;
uniform vec3 u_osc1Rgb;
uniform vec3 u_osc2Rgb;

void main(void) {
    vec3 light = vec3(0.) * 2.;
    vec3 skyColor = vec3(1., 1., 0.7) * cos(u_osc1Rgb * 10.);
    vec3 groundColor = vec3(0.5, 0.3, 0.7) * sin((u_osc2Rgb * 10.)) + vec3(0.5);
    vec3 color1 =  vec3(cos(displacement * 2.), cos(qnoise  * 2.), sin(displacement * 2.));
    vec3 color2 = vec3(qnoise * displacement);
    float filterValue = u_filter / 10000.;

    vec3 leadingColor;
    vec3 lightDirection;

    if (u_osc1Rgb.b > 0.5) {
        leadingColor = color1;
        lightDirection = normalize(vec3(0.1, -0., 1.2));
    } else {
        leadingColor = color2;
        lightDirection = normalize(vec3(0.9, -1.5, 0.7));
    }

    light = mix(skyColor, groundColor, dot(lightDirection, vecNormal) * 2.);
    light += dot(lightDirection, leadingColor);
    vec4 finalFragColor = vec4(0.);

    if (u_osc1Rgb.b > 0.5 || u_osc2Rgb.b > 0.5) {
        finalFragColor = vec4(mix(light, cos(leadingColor), sin(leadingColor)), 1.);
    } else {
        finalFragColor = vec4(light, 1.);
    }

    gl_FragColor = mix(finalFragColor, vec4(0.), vec4(cos(filterValue) / exp(filterValue) / 2.4));
}
