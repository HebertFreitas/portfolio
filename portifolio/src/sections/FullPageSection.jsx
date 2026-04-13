import { Box } from "@chakra-ui/react";

export function FullPageSection({ id, children }) {
  return (
    <Box
      id={id}
      // header é fixed, então descontamos a altura no desktop
      minH={{ base: "auto", lg: "calc(100svh - 92px)" }}
      scrollSnapAlign="none"
      scrollMarginTop={{ base: "88px", lg: "96px" }}
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={{ base: "14", lg: "0" }}
      w="full"
      
    >
      {children}
    </Box>
  );
}
