import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { useControls } from "leva";

export default function Fox() {
  const fox = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(fox.animations, fox.scene);

  const { animationName } = useControls({
    animationName: {
      options: animations.names,
    },
  });

  useEffect(() => {
    const action = animations.actions[animationName];
    // action.reset() resets the previously playing action if applicable
    action.reset().fadeIn(0.5).play();
    console.log(animationName);
    // setTimeout(() => {
    //   // animations to be played by associated mesh
    //   animations.actions.Walk.play();
    //   //   sets animation blend; actionToFadeInto.crossFadeFrom(actionToFadeFrom, blendTime)
    //   animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1);
    // }, 2000);
    // runs when component is disposed or when watched value changes again
    return () => {
      action.fadeOut(0.5);
    };
  }, [animationName]);

  return (
    <primitive
      object={fox.scene}
      scale={0.02}
      position={[-2.5, 0, -2.5]}
      rotation-y={0.3}
    />
  );
}
