import { Box, Image, VStack, Text } from "@chakra-ui/react";
import { GlassCard } from "./GlassCard.jsx";
import { cardHoverEffect } from "../styles/hoverEffects.js";

export function SkillCard({ icon, name, iconSize = "100%" }) {
  return (
    <GlassCard 
      maxW="100%" 
      boxShadow={{ base: "lg", _dark: "0 8px 32px rgba(0, 0, 0, 0.4)" }}
      {...cardHoverEffect}
      
    >
      <VStack gap="3">
        <Box
          boxSize="100px"
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
        <Text fontSize="lg" fontWeight="800">
          {name}
        </Text>
      </VStack>
    </GlassCard>
  );
}