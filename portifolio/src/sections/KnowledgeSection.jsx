import { Box, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";

import { GlassCard } from "../components/GlassCard.jsx";
import { SectionHeader } from "../components/SectionHeader.jsx";
import { Stagger, StaggerItem } from "../components/Stagger.jsx";
import { knowledgeData } from "../data/knowledgeData.js";
import { FullPageSection } from "./FullPageSection.jsx";

function KnowledgeCard({ item }) {
  return (
    <GlassCard h="full">
      <Stack gap="4" align="center" textAlign="center">
        <Text fontWeight="700" fontSize="lg" letterSpacing="-0.01em">
          {item.title}
        </Text>
        <Text
          color={{ base: "fg.muted", _dark: "whiteAlpha.700" }}
          fontSize="sm"
          lineHeight="1.7"
        >
          {item.description}
        </Text>
        <HStack gap="2" flexWrap="wrap" justify="center">
          {item.tags.map((tag) => (
            <Box
              key={tag}
              px="3"
              py="1"
              rounded="full"
              fontSize="xs"
              fontWeight="600"
              borderWidth="1px"
              borderColor={{ base: "border", _dark: "whiteAlpha.200" }}
              bg={{ base: "bg.subtle", _dark: "whiteAlpha.50" }}
              color={{ base: "fg.muted", _dark: "whiteAlpha.800" }}
            >
              {tag}
            </Box>
          ))}
        </HStack>
      </Stack>
    </GlassCard>
  );
}

export function KnowledgeSection() {
  return (
    <FullPageSection id="conhecimento">
      <Box w="full">
        <SectionHeader
          badge="Expertise"
          title="Conhecimento aplicado em produção"
          description="Mais do que ferramentas — domínio de arquitetura, integração e entrega contínua em cada camada do produto."
        />

        <Stagger stagger={0.1}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="5" w="full">
            {knowledgeData.map((item) => (
              <StaggerItem key={item.id}>
                <KnowledgeCard item={item} />
              </StaggerItem>
            ))}
          </SimpleGrid>
        </Stagger>
      </Box>
    </FullPageSection>
  );
}
