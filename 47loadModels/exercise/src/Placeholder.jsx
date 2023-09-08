export default function Placeholder(props) {
  return (
    <mesh {...props}>
      {" "}
      {/* args subdivision for wireframe */}
      <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
      <meshBasicMaterial wireframe color={"red"} />
    </mesh>
  );
}
