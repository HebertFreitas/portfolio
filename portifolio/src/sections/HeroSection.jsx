import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion } from "motion/react";
import { FaDownload, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

import { Reveal } from "../components/Reveal.jsx";
import { RESUME_FILENAME, RESUME_URL } from "../data/siteLinks.js";
import { FullPageSection } from "./FullPageSection.jsx";
import { cardHoverEffect } from "../styles/hoverEffects.js";

const MotionBox = motion.create(Box);

const WHATSAPP_URL = "https://wa.me/5531991059695";
const LINKEDIN_URL = "https://www.linkedin.com/in/hebert-freitas-775093175/";
const GITHUB_URL = "https://github.com/HebertFreitas";

export function HeroSection() {
  return (
    <FullPageSection id="inicio" fillViewport>
      <Box
        position="absolute"
        inset="0"
        pointerEvents="none"
        overflow="hidden"
        aria-hidden="true"
      >
        <Box
          position="absolute"
          top="-20%"
          left="50%"
          transform="translateX(-50%)"
          w={{ base: "320px", md: "560px" }}
          h={{ base: "320px", md: "560px" }}
          rounded="full"
          bg={{ base: "blue.100/60", _dark: "blue.600/15" }}
          filter="blur(80px)"
        />
      </Box>

      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        gap={{ base: "10", lg: "16" }}
        alignItems="center"
        w="full"
        position="relative"
      >
        <Stack gap="7" align="center" textAlign="center">
          <Stack gap="5" align="center" w="full">
            <Reveal delay={0.05}>
              <Box
                display="inline-flex"
                alignItems="center"
                gap="2"
                rounded="full"
                borderWidth="1px"
                borderColor={{ base: "blue.200", _dark: "blue.400/30" }}
                bg={{ base: "blue.50", _dark: "blue.950/40" }}
                px="4"
                py="1.5"
                fontSize="sm"
                fontWeight="600"
                color={{ base: "blue.700", _dark: "blue.300" }}
              >
                <Box
                  boxSize="1.5"
                  rounded="full"
                  bg="green.400"
                  animation="pulse 2s ease-in-out infinite"
                />
                Disponível para novos projetos
              </Box>
            </Reveal>

            <Heading
              as="h1"
              fontSize={{ base: "2.5rem", md: "4rem", lg: "4.5rem" }}
              lineHeight={{ base: "1.08", md: "1.02" }}
              letterSpacing="-0.04em"
              fontWeight="800"
            >
              <Reveal delay={0.1}>
                <Box as="span" display="block">
                  Construo produtos digitais
                </Box>
              </Reveal>
              <Reveal delay={0.18}>
                <Box
                  as="span"
                  display="block"
                  mt="2"
                  bgGradient="to-r"
                  gradientFrom={{ base: "blue.500", _dark: "blue.300" }}
                  gradientTo={{ base: "purple.500", _dark: "purple.300" }}
                  bgClip="text"
                  color="transparent"
                >
                  de ponta a ponta.
                </Box>
              </Reveal>
            </Heading>

            <Reveal delay={0.26}>
              <Text
                maxW="lg"
                mx="auto"
                color={{ base: "fg.muted", _dark: "whiteAlpha.700" }}
                fontSize={{ base: "md", md: "lg" }}
                lineHeight="1.75"
              >
                Olá, sou{" "}
                <Box as="span" fontWeight="700" color={{ base: "fg", _dark: "whiteAlpha.900" }}>
                  Hebert Freitas
                </Box>
                — Desenvolvedor Full Stack com experiência em React, Flutter e .NET.
                Transformo requisitos complexos em aplicações web e mobile escaláveis,
                com foco em performance e qualidade de código.
              </Text>
            </Reveal>
          </Stack>

          <Reveal delay={0.34}>
            <HStack gap="3" flexWrap="wrap" justify="center">
              <Button
                asChild
                colorPalette="blue"
                size="lg"
                rounded="lg"
                px="6"
                {...cardHoverEffect}
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  <HStack gap="2">
                    <FaWhatsapp size={18} />
                    <span>Iniciar conversa</span>
                  </HStack>
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                rounded="lg"
                px="6"
                borderColor={{ base: "border", _dark: "whiteAlpha.300" }}
                {...cardHoverEffect}
              >
                <a
                  href="#habilidades"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("habilidades")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Ver habilidades →
                </a>
              </Button>
            </HStack>
          </Reveal>

          <Reveal delay={0.42}>
            <HStack gap="3" flexWrap="wrap" justify="center">
              <Button
                asChild
                colorPalette="blue"
                rounded="full"
                variant="outline"
                size="sm"
                aria-label="LinkedIn"
                {...cardHoverEffect}
              >
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                  <FaLinkedin size={18} />
                </a>
              </Button>

              <Button
                asChild
                colorPalette="blue"
                rounded="full"
                variant="outline"
                size="sm"
                aria-label="GitHub"
                {...cardHoverEffect}
              >
                <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                  <FaGithub size={18} />
                </a>
              </Button>

              <Button
                asChild
                colorPalette="blue"
                rounded="lg"
                size="sm"
                variant="ghost"
                {...cardHoverEffect}
              >
                <a href={RESUME_URL} download={RESUME_FILENAME}>
                  <HStack gap="2">
                    <FaDownload size={16} />
                    <span>Baixar currículo</span>
                  </HStack>
                </a>
              </Button>
            </HStack>
          </Reveal>
        </Stack>

        <Stack gap="5" alignItems="center">
          <Reveal delay={0.5}>
            <Box
              rounded="full"
              overflow="hidden"
              borderWidth="1px"
              borderColor={{ base: "border", _dark: "whiteAlpha.200" }}
              boxSize={{ base: "280px", md: "400px", lg: "420px" }}
              flex="0 0 auto"
              boxShadow={{
                base: "0 0 40px rgba(59, 130, 246, 0.25)",
                _dark: "0 0 70px rgba(59, 130, 246, 0.35)",
              }}
            >
              <Image
                src="/uploads/me2.png"
                alt="Hebert Freitas — Desenvolvedor Full Stack especializado em React, Flutter e .NET"
                w="100%"
                h="100%"
                objectFit="cover"
                loading="eager"
                fetchPriority="high"
              />
            </Box>
          </Reveal>
        </Stack>
      </SimpleGrid>

      <MotionBox
        position="absolute"
        insetInline="0"
        bottom={{ base: "24px", md: "48px" }}
        display="flex"
        justifyContent="center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        color={{ base: "fg.muted", _dark: "whiteAlpha.700" }}
        cursor="pointer"
        role="button"
        tabIndex={0}
        aria-label="Rolar para a próxima seção"
        onClick={() =>
          document.getElementById("habilidades")?.scrollIntoView({ behavior: "smooth" })
        }
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            document.getElementById("habilidades")?.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <Box
          borderWidth="1px"
          borderColor={{ base: "border", _dark: "blue.400" }}
          bg={{ base: "bg.panel", _dark: "whiteAlpha.50" }}
          backdropFilter={{ _dark: "blur(10px)" }}
          rounded="full"
          px="3"
          py="2"
          _hover={{ color: { base: "fg", _dark: "whiteAlpha.900" } }}
          transition="color 0.2s ease"
        >
          <FiChevronDown size={22} />
        </Box>
      </MotionBox>
    </FullPageSection>
  );
}
