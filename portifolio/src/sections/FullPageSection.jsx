import { Box } from "@chakra-ui/react";

const spacingMap = {
  default: { base: "10", md: "16", lg: "20" },
  tight: { base: "8", md: "12", lg: "14" },
};

export function FullPageSection({ id, children, fillViewport = false, spacing = "default" }) {
  const sectionPy = spacingMap[spacing] ?? spacingMap.default;

  return (
    <Box
      id={id}
      minH={fillViewport ? { base: "auto", lg: "calc(100svh - 92px)" } : "auto"}
      scrollMarginTop={{ base: "76px", lg: "96px" }}
      position="relative"
      display="flex"
      alignItems={fillViewport ? "center" : "flex-start"}
      justifyContent="center"
      py={fillViewport ? { base: "10", md: "14", lg: "0" } : sectionPy}
      w="full"
    >
      {children}
    </Box>
  );
}
