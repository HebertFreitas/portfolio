import { Text } from "@chakra-ui/react"

import { FullPageSection } from "./FullPageSection.jsx"
import { GlassCard } from "../components/GlassCard.jsx"

import { Reveal } from "../components/Reveal.jsx"

export function ContactSection() {
  return (
    <FullPageSection id="contato">
      <Reveal>
        <GlassCard maxW="3xl">
          <Text fontWeight="700" letterSpacing="wider" textTransform="uppercase" mb="2">
            Contato
          </Text>
          <Text color={{ base: "fg.muted", _dark: "whiteAlpha.700" }}>
            Texto fictício: pronto para conversar sobre seu projeto. Entre em contato para orçamentos, parcerias ou oportunidades.
          </Text>
        </GlassCard>
      </Reveal>
    </FullPageSection>
  )
}

