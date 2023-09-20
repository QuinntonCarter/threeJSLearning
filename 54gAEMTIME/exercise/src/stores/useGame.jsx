import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

// store of information/status/mthods pertaining to/necessary for gameplay functionality
export default create(
  subscribeWithSelector((set) => {
    return {
      // make blocks count used with out app for level length variable etc
      blocksCount: 3,
      blockSeed: 0,
      // time
      startTime: 0,
      endTime: 0,
      // phases
      phase: "ready",
      start: () => {
        set(({ phase }) => {
          if (phase === "ready") {
            // returns new state (in this case for properties which need to change)
            return { phase: "playing", startTime: Date.now() };
          }
          return {};
        });
      },
      restart: () => {
        set(({ phase }) => {
          if (phase === "playing" || phase === "ended") {
            // returns new state (in this case for properties which need to change)
            // randomizes seed valuew
            return { phase: "ready", blocksSeed: Math.random() };
          }
          return {};
        });
      },
      end: () => {
        set(({ phase }) => {
          if (phase === "playing") {
            // returns new state (in this case for properties which need to change)
            return { phase: "ended", endTime: Date.now() };
          }
          return {};
        });
      },
    };
  })
);
