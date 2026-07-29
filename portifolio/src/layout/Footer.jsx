import { Box, Container, HStack, Link, Stack, Text } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const navLinks = [
  { label: "Início", href: "/#inicio" },
  { label: "Habilidades", href: "/#habilidades" },
  { label: "Experiências", href: "/#experiencias" },
  { label: "Projetos", href: "/#projetos" },
  { label: "Conhecimento", href: "/#conhecimento" },
  { label: "Contato", href: "/#contato" },
];

const socialLinks = [
  {
    label: "WhatsApp",
    href: "https://wa.me/5531991059695",
    icon: FaWhatsapp,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hebert-freitas-775093175/",
    icon: FaLinkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/HebertFreitas",
    icon: FaGithub,
  },
];

export function Footer() {
  return (
    <Box
      as="footer"
      borderTopWidth="1px"
      borderColor={{ base: "border", _dark: "whiteAlpha.200" }}
      bg="transparent"
    >
      <Container maxW="6xl" py={{ base: "6", md: "8" }} px={{ base: "4", md: "6" }}>
        <Stack
          gap="6"
          align={{ base: "center", md: "stretch" }}
          textAlign={{ base: "center", md: "left" }}
        >
          <HStack
            justify="space-between"
            flexDir={{ base: "column", md: "row" }}
            gap="4"
            align={{ base: "center", md: "center" }}
          >
            <Stack gap="1" align={{ base: "center", md: "flex-start" }}>
              <Text fontWeight="800" letterSpacing="-0.02em">
                Hebert Freitas
              </Text>
              <Text fontSize="sm" color="fg.muted">
                Desenvolvedor Full Stack
              </Text>
            </Stack>

            <HStack gap={{ base: "3", md: "4" }} flexWrap="wrap" justify="center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  fontSize="sm"
                  color="fg.muted"
                  _hover={{ color: "fg" }}
                  transition="color 0.2s"
                >
                  {link.label}
                </Link>
              ))}
            </HStack>

            <HStack gap="3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  color="fg.muted"
                  _hover={{ color: { base: "blue.600", _dark: "blue.300" } }}
                  transition="color 0.2s"
                >
                  <social.icon size={18} />
                </Link>
              ))}
            </HStack>
          </HStack>

          <Text
            fontSize="sm"
            color="fg.muted"
            textAlign="center"
            borderTopWidth="1px"
            borderColor={{ base: "border", _dark: "whiteAlpha.100" }}
            pt="6"
          >
            © {new Date().getFullYear()} Hebert Freitas. Todos os direitos reservados.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
