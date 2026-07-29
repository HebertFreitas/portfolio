import { Box, Heading, Stack, Text } from "@chakra-ui/react";

import { Reveal } from "./Reveal.jsx";

export function SectionHeader({
  badge,
  title,
  description,
  delay = 0,
  compact = false,
}) {
  return (
    <Reveal delay={delay}>
      <Stack
        gap={compact ? "3" : "4"}
        mb={compact ? { base: "6", md: "7" } : { base: "8", md: "10" }}
        textAlign="center"
        align="center"
        maxW="3xl"
        mx="auto"
      >
        {badge ? (
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
            letterSpacing="wide"
            textTransform="uppercase"
          >
            <Box
              boxSize="1.5"
              rounded="full"
              bg={{ base: "blue.500", _dark: "blue.400" }}
            />
            {badge}
          </Box>
        ) : null}

        <Heading
          as="h2"
          fontSize={compact ? { base: "xl", md: "3xl" } : { base: "2xl", md: "4xl" }}
          fontWeight="800"
          letterSpacing="-0.03em"
          lineHeight="1.1"
        >
          {title}
        </Heading>

        {description ? (
          <Text
            color={{ base: "fg.muted", _dark: "whiteAlpha.700" }}
            fontSize={compact ? { base: "sm", md: "md" } : { base: "md", md: "lg" }}
            maxW="2xl"
            lineHeight="1.6"
          >
            {description}
          </Text>
        ) : null}
      </Stack>
    </Reveal>
  );
}
