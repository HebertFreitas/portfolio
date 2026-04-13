import { Box, Container, Link, Text } from "@chakra-ui/react"

export function Footer() {
  return (
    <Box as="footer" borderTopWidth="1px" borderColor={{ base: "border", _dark: "whiteAlpha.200" }} bg="transparent">
      <Container
        maxW="6xl"
        py="6"
        display="flex"
        alignItems={{ base: "start", md: "center" }}
        justifyContent="center"
        flexDir={{ base: "column", md: "row" }}
        gap="3"
      >

        <Text color="fg.muted">Desenvolvido por Hebert Freitas - 2026</Text>
      </Container>
    </Box>
  )
}

