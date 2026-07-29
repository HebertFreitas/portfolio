import { motion, useReducedMotion } from "motion/react";

const MotionDiv = motion.div;

const EASE = [0.22, 1, 0.36, 1];

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
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
    </MotionDiv>
  );
}
