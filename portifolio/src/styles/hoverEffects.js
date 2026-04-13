export const cardHoverEffect = {
  cursor: "pointer",
  transition: "all 0.3s ease",
  _hover: {
    transform: "translateY(-8px) scale(1.05)",
    boxShadow: { base: "xl", _dark: "0 12px 40px rgba(59, 130, 246, 0.5)" },
    borderColor: { base: "blue.400", _dark: "blue.400" },
  },
};

export const subtleHoverEffect = {
  cursor: "pointer",
  transition: "all 0.2s ease",
  _hover: {
    transform: "translateY(-4px)",
    boxShadow: { base: "md", _dark: "0 4px 20px rgba(59, 130, 246, 0.3)" },
  },
};

export const scaleHoverEffect = {
  cursor: "pointer",
  transition: "transform 0.2s ease",
  _hover: {
    transform: "scale(1.08)",
  },
};

export const glowHoverEffect = {
  cursor: "pointer",
  transition: "all 0.3s ease",
  _hover: {
    boxShadow: {
      base: "0 0 20px rgba(59, 130, 246, 0.4)",
      _dark: "0 0 30px rgba(59, 130, 246, 0.6)",
    },
  },
};
