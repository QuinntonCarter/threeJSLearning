precision mediump float;
// import from vertex
varying float vRandom;
uniform vec3 uColor;
uniform sampler2D uTexture;
varying vec2 vUv;
varying float vElevation;

void main(){
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb *= vElevation * 3.0 + 0.8;

    gl_FragColor = textureColor; 
    // gl_FragColor = vec4(uColor, 1.0); 
    // gl_FragColor = vec4(1.0, 0.5, 0.7, 0.9);

}