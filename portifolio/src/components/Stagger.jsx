import { motion } from "motion/react"

const MotionDiv = motion.div

export function Stagger({ children, stagger = 0.06, delay = 0 }) {
  return (
    <MotionDiv
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3, margin: "-96px 0px -20% 0px" }}
    >
      {children}
    </MotionDiv>
  )
}

export function StaggerItem({ children }) {
  return (
    <MotionDiv
      variants={{
        hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionDiv>
  )
}

