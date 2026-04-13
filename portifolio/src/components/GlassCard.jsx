import { Box } from "@chakra-ui/react"

export function GlassCard({ children, ...props }) {
  return (
    <Box
      rounded="2xl"
      borderWidth="1px"
      borderColor={{ base: "black", _dark: "whiteAlpha.200" }}
      bg={{ base: "bg.panel", _dark: "whiteAlpha.50"  }}
      backdropFilter={{ _dark: "blur(12px)" }}

      p={{ base: "5", md: "6" }}
      w="full"
      {...props}
    >
      {children}
    </Box>
  )
}

