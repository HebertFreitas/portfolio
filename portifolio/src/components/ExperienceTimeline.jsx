import { Box, Grid, HStack, Stack, Text } from "@chakra-ui/react";

import { Stagger, StaggerItem } from "./Stagger.jsx";
import { subtleHoverEffect } from "../styles/hoverEffects.js";

function TimelineNode({ isLast }) {
  return (
    <Stack align="center" flexShrink={0} w={{ base: "auto", md: "48px" }} position="relative">
      <Box
        boxSize="10px"
        bg={{ base: "blue.500", _dark: "blue.400" }}
        transform="rotate(45deg)"
        flexShrink={0}
        zIndex="1"
        boxShadow={{
          base: "0 0 0 3px var(--chakra-colors-bg)",
          _dark: "0 0 0 3px #141414",
        }}
      />
      {!isLast ? (
        <Box
          display={{ base: "none", md: "block" }}
          position="absolute"
          top="10px"
          w="1px"
          h="calc(100% + 48px)"
          bg={{ base: "blackAlpha.200", _dark: "whiteAlpha.200" }}
        />
      ) : null}
    </Stack>
  );
}

function ExperienceEntry({ experience, index, isLast }) {
  const entryNumber = String(index + 1).padStart(2, "0");

  return (
    <Grid
        templateColumns={{ base: "1fr", md: "72px 48px 1fr" }}
        gap={{ base: "4", md: "0" }}
        pb={{ base: "8", md: isLast ? "0" : "12" }}
        position="relative"
      >
        <Text
          display={{ base: "none", md: "block" }}
          fontSize="xs"
          fontWeight="700"
          letterSpacing="0.14em"
          textTransform="uppercase"
          color={{ base: "fg.muted", _dark: "whiteAlpha.500" }}
          pt="1"
          fontFamily="mono"
        >
          {experience.period}
        </Text>

        <Box display={{ base: "none", md: "flex" }} justifyContent="center">
          <TimelineNode isLast={isLast} />
        </Box>

        <Box
          borderWidth="1px"
          borderColor={{ base: "blackAlpha.200", _dark: "whiteAlpha.150" }}
          borderLeftWidth={{ base: "1px", md: "2px" }}
          borderLeftColor={{
            base: "blackAlpha.200",
            _dark: "whiteAlpha.150",
          }}
          rounded={{ base: "lg", md: "none" }}
          roundedRight={{ md: "lg" }}
          bg={{ base: "bg.panel", _dark: "whiteAlpha.30" }}
          p={{ base: "4", sm: "5", md: "6" }}
          pl={{ base: "4", sm: "5", md: "8" }}
          position="relative"
          transition="border-color 0.25s ease, background 0.25s ease"
          _hover={{
            borderLeftColor: { base: "blue.400", _dark: "blue.400" },
            bg: { base: "blue.50/40", _dark: "whiteAlpha.50" },
          }}
          {...subtleHoverEffect}
        >
          <HStack
            display={{ base: "flex", md: "none" }}
            gap="3"
            mb="4"
            align="center"
          >
            <Box
              boxSize="8px"
              bg={{ base: "blue.500", _dark: "blue.400" }}
              transform="rotate(45deg)"
              flexShrink={0}
            />
            <Text
              fontSize="xs"
              fontWeight="700"
              letterSpacing="0.12em"
              textTransform="uppercase"
              color={{ base: "fg.muted", _dark: "whiteAlpha.500" }}
              fontFamily="mono"
            >
              {experience.period}
            </Text>
          </HStack>

          <Text
            position="absolute"
            top={{ base: "3", md: "5" }}
            right={{ base: "3", md: "6" }}
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="900"
            letterSpacing="-0.06em"
            lineHeight="1"
            color={{ base: "blackAlpha.50", _dark: "whiteAlpha.80" }}
            userSelect="none"
            aria-hidden="true"
          >
            {entryNumber}
          </Text>

          <Stack gap="4" pr={{ base: "8", md: "14" }}>
            <Stack gap="2">
              <HStack gap="3" flexWrap="wrap" align="center">
                <Box
                  px="2.5"
                  py="0.5"
                  rounded="sm"
                  fontSize="10px"
                  fontWeight="800"
                  letterSpacing="0.16em"
                  textTransform="uppercase"
                  borderWidth="1px"
                  borderColor={{ base: "blackAlpha.200", _dark: "whiteAlpha.200" }}
                  color={{ base: "fg.muted", _dark: "whiteAlpha.700" }}
                >
                  {experience.type}
                </Box>
              </HStack>

              <Text
                as="h3"
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="800"
                letterSpacing="-0.02em"
                lineHeight="1.25"
              >
                {experience.role}
              </Text>

              <Text
                fontSize="sm"
                fontWeight="600"
                color={{ base: "blue.700", _dark: "blue.300" }}
              >
                {experience.company}
              </Text>
            </Stack>

            <Text
              fontSize="sm"
              lineHeight="1.75"
              color={{ base: "fg.muted", _dark: "whiteAlpha.700" }}
              maxW="prose"
            >
              {experience.description}
            </Text>

            <Stack as="ul" gap="2" pl="0" listStyleType="none">
              {experience.highlights.map((item) => (
                <HStack key={item} as="li" align="start" gap="3">
                  <Box
                    mt="2.5"
                    boxSize="4px"
                    bg={{ base: "fg", _dark: "whiteAlpha.800" }}
                    flexShrink={0}
                  />
                  <Text
                    fontSize="sm"
                    lineHeight="1.6"
                    color={{ base: "fg", _dark: "whiteAlpha.850" }}
                  >
                    {item}
                  </Text>
                </HStack>
              ))}
            </Stack>

            {experience.stack?.length ? (
              <HStack gap="2" flexWrap="wrap" pt="1">
                {experience.stack.map((tech) => (
                  <Box
                    key={tech}
                    as="span"
                    px="2.5"
                    py="1"
                    rounded="md"
                    fontSize="xs"
                    fontWeight="600"
                    fontFamily="mono"
                    letterSpacing="-0.01em"
                    borderWidth="1px"
                    borderColor={{ base: "blackAlpha.150", _dark: "whiteAlpha.150" }}
                    color={{ base: "fg.muted", _dark: "whiteAlpha.700" }}
                    bg={{ base: "bg.subtle", _dark: "transparent" }}
                  >
                    {tech}
                  </Box>
                ))}
              </HStack>
            ) : null}
          </Stack>
        </Box>
      </Grid>
  );
}

export function ExperienceTimeline({ experiences }) {
  return (
    <Stagger stagger={0.12}>
      <Box w="full" role="list" aria-label="Linha do tempo de experiências">
        {experiences.map((experience, index) => (
          <Box key={experience.id} role="listitem">
            <StaggerItem y={32}>
              <ExperienceEntry
                experience={experience}
                index={index}
                isLast={index === experiences.length - 1}
              />
            </StaggerItem>
          </Box>
        ))}
      </Box>
    </Stagger>
  );
}
