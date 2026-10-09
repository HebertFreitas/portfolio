export const motionTokens = {
  ease: [0.22, 1, 0.36, 1],
  easeInOut: [0.65, 0, 0.35, 1],
  duration: {
    fast: 0.22,
    normal: 0.5,
    slow: 0.72,
    cinematic: 1.2,
  },
  distance: {
    small: 18,
    medium: 28,
    large: 42,
  },
  stagger: {
    tight: 0.06,
    base: 0.08,
    loose: 0.1,
  },
  spring: {
    gentle: { type: "spring", stiffness: 80, damping: 18 },
    quick: { type: "spring", stiffness: 360, damping: 24 },
    layout: { type: "spring", stiffness: 260, damping: 30 },
  },
};

export const staggerContainer = (stagger = motionTokens.stagger.base, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

// Text line that rises from behind a mask (parent must clip overflow).
export const maskLine = {
  hidden: { opacity: 0, y: "0.6em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.duration.cinematic, ease: motionTokens.ease },
  },
};
