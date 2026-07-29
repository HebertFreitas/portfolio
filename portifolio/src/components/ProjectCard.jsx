import { Box, HStack, Image, Link, Stack, Text } from "@chakra-ui/react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

import { GlassCard } from "./GlassCard.jsx";
import { cardHoverEffect } from "../styles/hoverEffects.js";

export function ProjectCard({ project }) {
  const hasLinks = project.github || project.demo;

  return (
    <GlassCard
      h="full"
      p="0"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      {...cardHoverEffect}
    >
      <Box
        h={{ base: "180px", md: "200px" }}
        bg={{
          base: "linear-gradient(135deg, var(--chakra-colors-blue-50), var(--chakra-colors-purple-50))",
          _dark: "linear-gradient(135deg, rgba(30,58,138,0.35), rgba(88,28,135,0.25))",
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderBottomWidth="1px"
        borderColor={{ base: "border", _dark: "whiteAlpha.150" }}
        overflow="hidden"
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            w="full"
            h="full"
            objectFit="cover"
          />
        ) : (
          <Text
            fontSize="4xl"
            fontWeight="900"
            letterSpacing="-0.04em"
            color={{ base: "blue.400", _dark: "blue.300" }}
            opacity={0.7}
            userSelect="none"
            aria-hidden="true"
          >
            {project.title.charAt(0)}
          </Text>
        )}
      </Box>

      <Stack gap="4" p={{ base: "5", md: "6" }} flex="1">
        <Stack gap="2" textAlign="center" align="center">
          <Text as="h3" fontWeight="800" fontSize="lg" letterSpacing="-0.02em">
            {project.title}
          </Text>
          <Text
            fontSize="sm"
            lineHeight="1.7"
            color={{ base: "fg.muted", _dark: "whiteAlpha.700" }}
          >
            {project.description}
          </Text>
        </Stack>

        <HStack gap="2" flexWrap="wrap" justify="center">
          {project.stack.map((tech) => (
            <Box
              key={tech}
              px="2.5"
              py="1"
              rounded="md"
              fontSize="xs"
              fontWeight="600"
              borderWidth="1px"
              borderColor={{ base: "border", _dark: "whiteAlpha.200" }}
              bg={{ base: "bg.subtle", _dark: "whiteAlpha.40" }}
              color={{ base: "fg.muted", _dark: "whiteAlpha.700" }}
            >
              {tech}
            </Box>
          ))}
        </HStack>

        {hasLinks ? (
          <HStack gap="3" justify="center" pt="2" mt="auto">
            {project.github ? (
              <Link
                href={project.github}
                target="_blank"
                rel="noreferrer"
                display="inline-flex"
                alignItems="center"
                gap="2"
                fontSize="sm"
                fontWeight="700"
                color={{ base: "blue.600", _dark: "blue.300" }}
                _hover={{ textDecoration: "none", opacity: 0.85 }}
              >
                <FaGithub size={16} />
                GitHub
              </Link>
            ) : null}

            {project.demo ? (
              <Link
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                display="inline-flex"
                alignItems="center"
                gap="2"
                fontSize="sm"
                fontWeight="700"
                color={{ base: "blue.600", _dark: "blue.300" }}
                _hover={{ textDecoration: "none", opacity: 0.85 }}
              >
                <FaExternalLinkAlt size={14} />
                Demo
              </Link>
            ) : null}
          </HStack>
        ) : null}
      </Stack>
    </GlassCard>
  );
}
