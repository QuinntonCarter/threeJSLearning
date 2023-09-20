import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Lights from "./Lights.jsx";
import Level from "./Level.jsx";
import Marble from "./Marble.jsx";
import useGame from "./stores/useGame.jsx";

export default function Experience() {
  const blocksCount = useGame((state) => {
    return state.blocksCount;
  });
  // breaks usememo value to set new seed on restart
  const blocksSeed = useGame((state) => {
    return state.blocksSeed;
  });
  return (
    <>
      <OrbitControls makeDefault />

      <Physics debug={false}>
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Marble />
      </Physics>
    </>
  );
}
