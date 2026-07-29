import { Box, Image, VStack, Text } from "@chakra-ui/react";

import { GlassCard } from "./GlassCard.jsx";
import { cardHoverEffect } from "../styles/hoverEffects.js";

export function SkillCard({ icon, name, iconSize = "100%" }) {
  return (
    <GlassCard
      maxW="100%"
      p={{ base: "2.5", md: "3" }}
      boxShadow={{ base: "lg", _dark: "0 8px 32px rgba(0, 0, 0, 0.4)" }}
      {...cardHoverEffect}
    >
      <VStack gap={{ base: "1.5", md: "2" }}>
        <Box
          boxSize={{ base: "48px", sm: "56px", md: "72px" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={icon}
            alt={name}
            maxW={iconSize}
            maxH={iconSize}
            objectFit="contain"
          />
        </Box>
        <Text fontSize={{ base: "sm", md: "md" }} fontWeight="800" textAlign="center">
          {name}
        </Text>
      </VStack>
    </GlassCard>
  );
}
