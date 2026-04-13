import { motion } from "motion/react";

const MotionDiv = motion.div;

export function Reveal({
  children,
  delay = 0,
  duration = 2.0,
  y = 14,
  once = true,
  amount = 0.25,
}) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y, filter: "blur(3px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount, margin: "-96px 0px -20% 0px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionDiv>
  );
}
