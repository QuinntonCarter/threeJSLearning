#define PI 3.1415926535897932384626433832795;
varying vec2 vUv;

// for random number generation
float random(vec2 st){
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid){
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

void main()
{
    // pattern 3
    // float strength = vUv.x;

    // pattern 4
    // float strength = vUv.y;

    // pattern 5 invert shading
    // float strength = 1.0 - vUv.y;

    // pattern 6 invert and foggy gradient
    // float strength = vUv.y * 10.0;

    // pattern 7 blides effect; 0 to 100 reset 0 to 100 reset
    // float strength = mod(vUv.y * 10.0, 1.0);

    // pattern 8 blides effect; hard edge
    // float strength = mod(vUv.y * 10.0, 1.0);
    // conditions bad for perfomance
    // float strength = strength < 0.5 ? strength = 0.0 : strength= 1.0;
    // strength = step(0.5, strength);

    // pattern 9
    // edit pattern that shows
    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.8, strength);

    // pattern 10
    // float strength = mod(vUv.x * 10.0, 1.0);
    // strength = step(0.5, strength);

    // pattern 11
    // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength += step(0.8, mod(vUv.y * 10.0, 1.0));

    // pattern 12
    // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));

    // // pattern 13
    // float strength = step(0.4, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));

    // pattern 14
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y * 10.0, 1.0));

    // float barY = step(0.8, mod(vUv.x * 10.0, 1.0));
    // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));

    // float strength = barX + barY;

    // pattern 15
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));

    // float barY = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));
    // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));

    // float strength = barX + barY;

    // pattern 16
    // float strength = abs(vUv.x - 0.5);

    // pattern 17
    // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    // pattern 18
    // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    // pattern 19
    // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

    // pattern 20
    // float square1 = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // float square2 = 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // float strength = square1 * square2;

    // pattern 21
    // float strength = round(vUv.x * 10.0) / 10.0;

    // pattern 22
    // float strength = round(vUv.x * 10.0) / 10.0;
    // strength *= floor(vUv.y * 10.0) / 10.0;

    // pattern 23 static
    // float strength = random(vUv);

    // pattern 24
    // vec2 gridUV = vec2(
    //     floor(vUv.x * 10.0) / 10.0,
    //     floor(vUv.y * 10.0) / 10.0
    // );
    // float strength = random(gridUV);

    // pattern 25
    // vec2 gridUV = vec2(
    //     floor(vUv.x * 10.0) / 10.0,
    //     floor(vUv.y * 10.0 + vUv.x * 5.0) / 10.0
    // );
    // float strength = random(gridUV);

    // pattern 26
    // float strength = length(vUv);

    // pattern 27
    // float strength = distance(vUv, vec2(0.2, 0));

    // pattern 28
    // float strength = 1.0 - distance(vUv, vec2(0.5));

    // pattern 29
    // float strength = 0.015 / distance(vUv, vec2(0.5));

    // pattern 30
    // vec2 lightUV = vec2(
    //     vUv.x * 0.09 + 0.45,
    //     vUv.y * 0.5 + 0.25
    // );
    // float strength = 0.015 / distance(lightUV, vec2(0.5));

    // pattern 31
    // vec2 lightUV = vec2(
    //     vUv.x * 0.09 + 0.45,
    //     vUv.y * 0.5 + 0.25
    // );
    // float strength = 0.015 / distance(lightUV, vec2(0.5));

    // pattern 32
    // float pi = 3.1415926535897932384626433832795;
    vec2 rotatedUV = rotate(vUv, (PI * 0.25), vec2(0.5));

    vec2 lightUVX = vec2(rotatedUV.x * 0.1 + 0.45, rotatedUV.x * 0.5 + 0.25);
    float lightX = 0.015 / distance(lightUVX, vec2(0.5));

    vec2 lightUVY = vec2(rotatedUV.y * 0.1 + 0.45, rotatedUV.y * 0.5 + 0.25);
    float lightY = 0.015 / distance(lightUVY, vec2(0.5));
    
    float strength = lightX * lightY;

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}