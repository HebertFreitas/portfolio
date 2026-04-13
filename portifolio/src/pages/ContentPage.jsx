import { Box, Stack, Text } from "@chakra-ui/react"

import { PageFrame } from "../layout/PageFrame.jsx"

const copy = {
  "quem-sou": {
    title: "QUEM SOU",
    body:
      "Texto fictício: desenvolvedor full stack com foco em aplicações web, mobile e integrações. Busco entregar soluções robustas, bem desenhadas e fáceis de evoluir.",
  },
  servicos: {
    title: "Serviços",
    body:
      "Texto fictício: desenvolvimento de aplicações web com React, aplicativos mobile com Flutter e APIs em .NET, sempre priorizando qualidade, performance e clareza no projeto.",
  },
  conhecimento: {
    title: "Conhecimento",
    body:
      "Texto fictício: experiência com React/JavaScript no front-end, Flutter/Dart no mobile e .NET no back-end. Integrações, autenticação e banco de dados (SQL Server).",
  },
  contato: {
    title: "Contato",
    body:
      "Texto fictício: disponível para freelas e oportunidades. Entre em contato para conversarmos sobre escopo, prazos e orçamento.",
  },
}

export function ContentPage({ pageKey }) {
  const data = copy[pageKey]

  return (
    <PageFrame>
      <Box
        rounded="2xl"
        borderWidth="1px"
        borderColor={{ base: "border", _dark: "whiteAlpha.200" }}
        bg={{ base: "bg.panel", _dark: "whiteAlpha.50" }}
        backdropFilter={{ _dark: "blur(12px)" }}
        p={{ base: "5", md: "6" }}
      >
        <Stack gap="2">
          <Text fontWeight="800" letterSpacing="wider" textTransform="uppercase">
            {data?.title ?? "Página"}
          </Text>
          <Text color={{ base: "fg.muted", _dark: "whiteAlpha.700" }}>
            {data?.body ?? "Texto fictício."}
          </Text>
        </Stack>
      </Box>
    </PageFrame>
  )
}

