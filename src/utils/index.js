// src/utils/index.js
export { createImage } from "./createImage";
export { getRadianAngle } from "./getRadianAngle";

export function getStepId(stepNumber) {
  const stepMap = {
    4: "layout",
    5: "editor",
    6: "checkout",
    7: "confirmation",
  };
  return stepMap[stepNumber];
}
