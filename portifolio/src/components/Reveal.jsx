import { motion, useReducedMotion } from "motion/react";
import { motionTokens } from "../lib/motionTokens.js";

const MotionDiv = motion.div;

export function Reveal({
  children,
  delay = 0,
  duration = motionTokens.duration.slow,
  y = motionTokens.distance.medium,
  x = 0,
  once = true,
  amount = 0.15,
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div>{children}</div>;
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount, margin: "0px 0px -80px 0px" }}
      transition={{ duration, delay, ease: motionTokens.ease }}
    >
      {children}
    </MotionDiv>
  );
}
