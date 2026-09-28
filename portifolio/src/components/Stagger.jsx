import { motion, useReducedMotion } from "motion/react";
import { motionTokens } from "../lib/motionTokens.js";

const MotionDiv = motion.div;

export function Stagger({ children, stagger = 0.07, delay = 0 }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div>{children}</div>;
  }

  return (
    <MotionDiv
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -6% 0px" }}
    >
      {children}
    </MotionDiv>
  );
}

export function StaggerItem({ children, y = 24 }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div>{children}</div>;
  }

  return (
    <MotionDiv
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: motionTokens.duration.slow, ease: motionTokens.ease }}
    >
      {children}
    </MotionDiv>
  );
}
