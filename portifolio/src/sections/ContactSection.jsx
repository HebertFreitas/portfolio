import { Box, Button, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { FaArrowRight, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FiClock, FiMapPin, FiMonitor } from "react-icons/fi";

import { GlassCard } from "../components/GlassCard.jsx";
import { Reveal } from "../components/Reveal.jsx";
import { SectionHeader } from "../components/SectionHeader.jsx";
import { Stagger, StaggerItem } from "../components/Stagger.jsx";
import { cardHoverEffect } from "../styles/hoverEffects.js";
import { FullPageSection } from "./FullPageSection.jsx";

const WHATSAPP_URL = "https://wa.me/5531991059695";
const LINKEDIN_URL = "https://www.linkedin.com/in/hebert-freitas-775093175/";
const GITHUB_URL = "https://github.com/HebertFreitas";

const contactChannels = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+55 (31) 99105-9695",
    hint: "Resposta mais rápida",
    href: WHATSAPP_URL,
    icon: FaWhatsapp,
    featured: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "hebert-freitas",
    hint: "Vagas e parcerias",
    href: LINKEDIN_URL,
    icon: FaLinkedin,
  },
  {
    id: "github",
    label: "GitHub",
    value: "HebertFreitas",
    hint: "Projetos e código",
    href: GITHUB_URL,
    icon: FaGithub,
  },
];

const trustSignals = [
  { icon: FiClock, text: "Resposta em até 24h" },
  { icon: FiMonitor, text: "Remoto" },
  { icon: FiMapPin, text: "Belo Horizonte, MG" },
];

function ContactChannelCard({ channel }) {
  const Icon = channel.icon;

  return (
    <Box
      as="a"
      href={channel.href}
      target="_blank"
      rel="noreferrer"
      display="block"
      h="full"
      p={{ base: "6", md: "7" }}
      rounded="2xl"
      borderWidth="1px"
      borderColor={
        channel.featured
          ? { base: "blue.300", _dark: "blue.400/50" }
          : { base: "border", _dark: "whiteAlpha.200" }
      }
      bg={
        channel.featured
          ? { base: "blue.50/60", _dark: "blue.950/30" }
          : { base: "bg.subtle", _dark: "whiteAlpha.30" }
      }
      transition="all 0.25s ease"
      _hover={{
        borderColor: { base: "blue.400", _dark: "blue.400" },
        transform: "translateY(-4px)",
        boxShadow: { _dark: "0 16px 40px rgba(59, 130, 246, 0.15)" },
      }}
    >
      <Stack gap="5" align="center" textAlign="center" h="full">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxSize={{ base: "56px", md: "64px" }}
          rounded="2xl"
          bg={{ base: "bg.panel", _dark: "whiteAlpha.80" }}
          color={{ base: "blue.600", _dark: "blue.300" }}
          borderWidth="1px"
          borderColor={{ base: "blue.100", _dark: "whiteAlpha.150" }}
        >
          <Icon size={channel.featured ? 28 : 24} />
        </Box>

        <Stack gap="1">
          <Text
            fontSize="xs"
            fontWeight="800"
            letterSpacing="0.16em"
            textTransform="uppercase"
            color={{ base: "fg.muted", _dark: "whiteAlpha.600" }}
          >
            {channel.label}
          </Text>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="800"
            letterSpacing="-0.02em"
          >
            {channel.value}
          </Text>
          <Text
            fontSize="sm"
            color={{ base: "fg.muted", _dark: "whiteAlpha.700" }}
          >
            {channel.hint}
          </Text>
        </Stack>

        <HStack
          gap="2"
          mt="auto"
          color={{ base: "blue.600", _dark: "blue.300" }}
          fontSize="sm"
          fontWeight="700"
        >
          <Text>Acessar</Text>
          <FaArrowRight size={12} />
        </HStack>
      </Stack>
    </Box>
  );
}

export function ContactSection() {
  return (
    <FullPageSection id="contato">
      <Box w="full" position="relative">
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w={{ base: "280px", md: "640px" }}
          h={{ base: "280px", md: "400px" }}
          rounded="full"
          bg={{ base: "blue.100/40", _dark: "blue.600/10" }}
          filter="blur(90px)"
          pointerEvents="none"
          aria-hidden="true"
        />

        <SectionHeader
          badge="Contato"
          title="Vamos construir algo juntos?"
          description="Disponível para projetos freelance, vagas full-time e parcerias técnicas. Escolha o canal que preferir — respondo em até 24 horas."
        />

        <Reveal y={24}>
          <GlassCard
            w="full"
            p={{ base: "6", md: "10", lg: "12" }}
            position="relative"
            overflow="hidden"
          >
            <Stack gap={{ base: "8", md: "10" }}>
              <Stack gap="6" align="center" textAlign="center">
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  maxW="2xl"
                  lineHeight="1.7"
                  color={{ base: "fg.muted", _dark: "whiteAlpha.700" }}
                >
                  Do briefing à entrega, posso ajudar com aplicações web, mobile
                  e back-end. Me conte sobre o seu projeto e vamos encontrar a
                  melhor forma de trabalhar juntos.
                </Text>

                <HStack gap="4" flexWrap="wrap" justify="center" w="full">
                  <Button
                    asChild
                    colorPalette="blue"
                    size="xl"
                    rounded="xl"
                    px={{ base: "8", md: "10" }}
                    h={{ base: "14", md: "16" }}
                    fontSize={{ base: "md", md: "lg" }}
                    {...cardHoverEffect}
                  >
                    <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                      <HStack gap="3">
                        <FaWhatsapp size={22} />
                        <span>Iniciar conversa no WhatsApp</span>
                      </HStack>
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="xl"
                    rounded="xl"
                    px={{ base: "8", md: "10" }}
                    h={{ base: "14", md: "16" }}
                    fontSize={{ base: "md", md: "lg" }}
                    borderColor={{ base: "border", _dark: "whiteAlpha.300" }}
                    {...cardHoverEffect}
                  >
                    <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                      <HStack gap="3">
                        <FaLinkedin size={20} />
                        <span>Conectar no LinkedIn</span>
                      </HStack>
                    </a>
                  </Button>
                </HStack>
              </Stack>

              <Stagger stagger={0.1}>
                <SimpleGrid
                  columns={{ base: 1, md: 3 }}
                  gap={{ base: "4", md: "5" }}
                  w="full"
                >
                  {contactChannels.map((channel) => (
                    <StaggerItem key={channel.id} y={24}>
                      <ContactChannelCard channel={channel} />
                    </StaggerItem>
                  ))}
                </SimpleGrid>
              </Stagger>

              <SimpleGrid columns={{ base: 1, sm: 3 }} gap="4" w="full" pt="2">
                {trustSignals.map(({ icon: Icon, text }) => (
                  <HStack
                    key={text}
                    gap="3"
                    justify="center"
                    p="4"
                    rounded="xl"
                    borderWidth="1px"
                    borderColor={{ base: "border", _dark: "whiteAlpha.100" }}
                    bg={{ base: "blackAlpha.50", _dark: "whiteAlpha.20" }}
                  >
                    <Box color={{ base: "blue.600", _dark: "blue.300" }}>
                      <Icon size={18} />
                    </Box>
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color={{ base: "fg.muted", _dark: "whiteAlpha.700" }}
                    >
                      {text}
                    </Text>
                  </HStack>
                ))}
              </SimpleGrid>
            </Stack>
          </GlassCard>
        </Reveal>
      </Box>
    </FullPageSection>
  );
}
