import { Text } from "@chakra-ui/react"

import { FullPageSection } from "./FullPageSection.jsx"
import { GlassCard } from "./GlassCard.jsx"
import { Reveal } from "../components/Reveal.jsx"

export function KnowledgeSection() {
  return (
    <FullPageSection id="conhecimento">
      <Reveal>
        <GlassCard maxW="3xl">
          <Text fontWeight="700" letterSpacing="wider" textTransform="uppercase" mb="2">
            Conhecimento
          </Text>
          <Text color={{ base: "fg.muted", _dark: "whiteAlpha.700" }}>
            Texto fictício: React/JavaScript no front-end, Flutter/Dart no mobile e .NET no back-end, com experiência em SQL Server e
            integrações.
          </Text>
        </GlassCard>
      </Reveal>
    </FullPageSection>
  )
}

