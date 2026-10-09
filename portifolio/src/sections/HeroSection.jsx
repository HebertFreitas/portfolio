import { Box, Button, Grid, Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { FaDownload, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FiArrowDownRight } from "react-icons/fi";

import { Reveal } from "../components/Reveal.jsx";
import { maskLine, motionTokens, staggerContainer } from "../lib/motionTokens.js";
import { RESUME_FILENAME, RESUME_URL } from "../data/siteLinks.js";
import { FullPageSection } from "./FullPageSection.jsx";

const MotionBox = motion.create(Box);
const WHATSAPP_URL = "https://wa.me/5531991059695";
const LINKEDIN_URL = "https://www.linkedin.com/in/hebert-freitas-775093175/";
const GITHUB_URL = "https://github.com/HebertFreitas";

export function HeroSection() {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, reduceMotion ? 1 : 0]);

  const scrollToSkills = () => document.getElementById("habilidades")?.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
  });

  return (
    <Box ref={heroRef} position="relative">
      <FullPageSection id="inicio" fillViewport>
        <MotionBox style={{ opacity: contentOpacity }} w="full" position="relative" zIndex="1">
          <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1.08fr) minmax(340px, .92fr)" }} gap={{ base: "12", lg: "16", xl: "24" }} alignItems="center" w="full">
            <Stack gap={{ base: "7", md: "8" }} align="flex-start" textAlign="left">
              <Reveal delay={0.05}>
                <HStack className="availability-pill" gap="3">
                  <Box boxSize="7px" rounded="full" bg="blue.400" boxShadow="0 0 0 6px rgba(59,130,246,.12)" />
                  <Text>Disponível para novos projetos</Text>
                </HStack>
              </Reveal>

              <Heading as="h1" fontSize={{ base: "clamp(3rem, 15vw, 4.5rem)", md: "clamp(4.5rem, 9vw, 7rem)" }} lineHeight=".93" letterSpacing="-.055em" fontWeight="500" maxW="850px" className="hero-title">
                <MotionBox as="span" display="block" variants={staggerContainer(motionTokens.stagger.loose, 0.1)} initial="hidden" animate="visible">
                  <span className="hero-line"><motion.span variants={maskLine}>Construo produtos</motion.span></span>
                  <Box as="span" className="hero-line hero-line--em" color={{ base: "blue.600", _dark: "blue.300" }} fontStyle="italic" fontWeight="400">
                    <motion.span variants={maskLine}>digitais completos.</motion.span>
                    <svg className="hero-swash" viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true">
                      <motion.path
                        d="M2 9 C 60 3, 120 12, 180 7 S 270 4, 298 8"
                        variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: motionTokens.duration.cinematic, ease: motionTokens.easeInOut, delay: 0.6 } } }}
                      />
                    </svg>
                  </Box>
                </MotionBox>
              </Heading>

              <Reveal delay={0.26}>
                <Text maxW="620px" color={{ base: "#56626b", _dark: "rgba(241,238,233,.72)" }} fontSize={{ base: "md", md: "lg" }} lineHeight="1.8">
                  Sou <Box as="strong" color={{ base: "#171b1f", _dark: "#f1eee9" }}>Hebert Freitas</Box>, desenvolvedor Full Stack. Transformo requisitos complexos em experiências web e mobile claras, performáticas e prontas para crescer.
                </Text>
              </Reveal>

              <Reveal delay={0.34}>
                <HStack gap="3" flexWrap="wrap">
                  <Button asChild className="primary-cta" size="lg" rounded="full" px="7">
                    <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><FaWhatsapp /><span>Vamos conversar</span><FiArrowDownRight /></a>
                  </Button>
                  <Button variant="outline" size="lg" rounded="full" px="7" onClick={scrollToSkills} className="secondary-cta">Explorar trabalho</Button>
                </HStack>
              </Reveal>

              <Reveal delay={0.42}>
                <HStack gap="5" className="social-links" flexWrap="wrap">
                  <a href={LINKEDIN_URL} target="_blank" rel="noreferrer"><FaLinkedin /> LinkedIn</a>
                  <a href={GITHUB_URL} target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>
                  <a href={RESUME_URL} download={RESUME_FILENAME}><FaDownload /> Currículo</a>
                </HStack>
              </Reveal>
            </Stack>

            <Reveal delay={0.38} y={42}>
              <Box className="portrait-wrap">
                <Box className="portrait-frame">
                  <MotionBox style={{ y: imageY }} h="112%" mt="-6%">
                    <Image src="/uploads/hebert-portrait.jpeg" alt="Hebert Freitas usando terno preto em um evento ao ar livre" w="100%" h="100%" objectFit="cover" objectPosition="50% 34%" loading="eager" fetchPriority="high" />
                  </MotionBox>
                  <Box className="portrait-shade" aria-hidden="true" />
                  <Box className="portrait-caption"><Text>FULL STACK DEVELOPER</Text><Text>BELO HORIZONTE · BR</Text></Box>
                </Box>
                <MotionBox className="portrait-mark" initial={reduceMotion ? false : { opacity: 0, rotate: -8, scale: .8 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} transition={{ ...motionTokens.spring.gentle, delay: 0.8 }}>
                  <Image src="/iniciais_sem_fundo.png" alt="Logo HF" w="full" h="auto" />
                </MotionBox>
              </Box>
            </Reveal>
          </Grid>
        </MotionBox>

        <MotionBox className="scroll-cue" animate={reduceMotion ? undefined : { y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }} onClick={scrollToSkills} role="button" tabIndex={0} aria-label="Rolar para habilidades" onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && scrollToSkills()}>
          <span>Role para descobrir</span><FiArrowDownRight />
        </MotionBox>
      </FullPageSection>
    </Box>
  );
}
