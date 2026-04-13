import { Box, Button, Heading, HStack, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import { motion } from "motion/react"
import { Link as RouterLink } from "react-router-dom"

import { FullPageSection } from "./FullPageSection.jsx"
import { FaDownload, FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa"
import { FiChevronDown } from "react-icons/fi"
import { Reveal } from "../components/Reveal.jsx"
import { cardHoverEffect } from "../styles/hoverEffects.js"

const MotionBox = motion.create(Box)
export function HeroSection() {
  return (
    <FullPageSection id="inicio">
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: "25px", lg: "45px" }} alignItems="center" w="full">
        <Stack gap="7">
          <Stack gap="4">
           
              <Heading
                fontSize={{ base: "40px", md: "66px" }}
                lineHeight={{ base: "1.05", md: "0.98" }}
                letterSpacing="-0.06em"
              >
                <HStack align="center" gap={{ base: "4", md: "10" }} flexWrap="wrap">
                <Reveal delay={0.20}>
                  <Box as="span">
                    Olá, eu sou{" "}
                    <Box as="span" fontWeight="bold" color="blue.400">
                      Hebert
                      <br />
                      Freitas
                    </Box>
                  </Box>
                </Reveal>
                </HStack>
                <Reveal delay={0.40}>
                <Box as="span" display="block" mt="5">
                  Desenvolvedor FullStack
                </Box>
                </Reveal>
              </Heading>
            

            <Reveal delay={0.60}>
              <Text
                maxW="lg"
                color={{ base: "fg.muted", _dark: "whiteAlpha.700" }}
                fontSize={{ base: "md", md: "lg" }}
              >
                Desenvolvedor Fullstack com sólida experiência em desenvolvimento web (React) e mobile (Flutter), atualmente expandindo meus
                horizontes com .NET. Minha paixão por Front-end e Back-end me motiva a buscar desafios no desenvolvimento de sistemas
                destribuídos e de alta performance.
              </Text>
            </Reveal>
          </Stack>

            <HStack gap="3" flexWrap="wrap">
            <Reveal delay={0.70}>
              <Button asChild colorPalette="blue" rounded="full" borderRadius="8px" variant="outline" {...cardHoverEffect}>
                <a href="https://www.linkedin.com/in/hebert-freitas-775093175/" target="_blank" rel="noreferrer">
                  <HStack gap="2">
                    <FaLinkedin size={20} />
                    {/* <span>LinkedIn</span> */}
                  </HStack>
                </a>
              </Button>
              </Reveal>
             
              <Reveal delay={0.80}>
              <Button asChild colorPalette="blue" rounded="full" borderRadius="8px" variant="outline" {...cardHoverEffect}>
                <a href="https://github.com/HebertFreitas" target="_blank" rel="noreferrer">
                  <HStack gap="2">
                    <FaGithub size={20} />
                    {/* <span>LinkedIn</span> */}
                  </HStack>
                </a>
              </Button>
              </Reveal>
              <Reveal delay={0.90}>
              <Button asChild colorPalette="blue" rounded="full" borderRadius="8px" variant="outline" {...cardHoverEffect}>
                <a href="https://wa.me/5531991059695" target="_blank" rel="noreferrer">
                  <HStack gap="2">
                    <FaWhatsapp size={20} />
                    {/* <span>LinkedIn</span> */}
                  </HStack>
                </a>
              </Button>
              </Reveal>
              <Reveal delay={1.0}>
              <Button p="2" asChild colorPalette="blue" rounded="full" borderRadius="8px" {...cardHoverEffect}>
                <RouterLink to="/#contato">
                  <HStack gap="2">
                    <FaDownload size={20} />
                    <span>Baixar Currículo</span>
                  </HStack>
                </RouterLink>
              </Button>
              </Reveal>
            </HStack>
        
        </Stack>

        <Stack gap="5" alignItems="center">
          <Reveal delay={1.2}>
            <Box
              rounded="full"
              overflow="hidden"
              borderWidth="1px"
              borderColor={{ base: "border", _dark: "whiteAlpha.200" }}
              boxSize={{ base: "300px", md: "420px" }}
              flex="0 0 auto"
              boxShadow="0 0 70px rgb(16, 93, 216)"
            >
              <Image src="/uploads/me2.png" alt="Hebert Freitas" w="100%" h="100%" objectFit="cover" />
            </Box>
          </Reveal>

        </Stack>
      </SimpleGrid>

      <MotionBox
        position="absolute"
        insetInline="0"
        bottom={{ base: "40px", md: "70px" }}
        display="flex"
        justifyContent="center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 1.3 }}
        color={{ base: "fg.muted", _dark: "whiteAlpha.700" }}
        cursor="pointer"
        role="button"
        tabIndex={0}
        aria-label="Rolar para a próxima seção"
        onClick={() => document.getElementById("habilidades")?.scrollIntoView({ behavior: "smooth" })}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            document.getElementById("habilidades")?.scrollIntoView({ behavior: "smooth" })
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
  )
}

