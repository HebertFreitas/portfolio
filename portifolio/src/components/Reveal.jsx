import { motion, useReducedMotion } from "motion/react";

const MotionDiv = motion.div;

const EASE = [0.22, 1, 0.36, 1];

export function Reveal({
  children,
  delay = 0,
  duration = 0.55,
  y = 20,
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
      viewport={{ once, amount, margin: "0px 0px -6% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionDiv>
  );
}
