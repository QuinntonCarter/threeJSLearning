import { useKeyboardControls } from "@react-three/drei";
import useGame from "./stores/useGame";
import { useEffect, useRef } from "react";
import { addEffect } from "@react-three/fiber";

export default function Interface() {
  const { forward, rightward, backward, leftward, jump } = useKeyboardControls(
    (state) => state
  );
  const timeRef = useRef();
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();
      let elapsedTime = 0;
      if (state.phase === "playing") {
        elapsedTime = Date.now() - state.startTime;
      } else if (state.phase === "ended") {
        elapsedTime = state.endTime - state.startTime;
      }
      elapsedTime /= 1000;
      // toFixed(2) clamps number decimal to 100th (2 decimal points) and converts to string
      elapsedTime = elapsedTime.toFixed(2);
      if (timeRef.current) {
        timeRef.current.textContent = elapsedTime;
      }
    });
    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <div className="interface">
      {/* Time */}
      <div ref={timeRef} className="time">
        {timeRef.current?.textContent ? timeRef.current.textContent : "0.00"}
      </div>

      {/* Restart */}
      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}

      {/* Controls */}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key ${leftward ? "active" : ""}`}></div>
          <div className={`key ${backward ? "active" : ""}`}></div>
          <div className={`key ${rightward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? "active" : ""}`}></div>
        </div>
      </div>
    </div>
  );
}
