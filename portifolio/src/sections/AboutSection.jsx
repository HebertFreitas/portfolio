import { Box, SimpleGrid } from "@chakra-ui/react";

import { SectionHeader } from "../components/SectionHeader.jsx";
import { SkillCategory } from "../components/SkillCategory.jsx";
import { skillsData } from "../data/skillsData.js";
import { FullPageSection } from "./FullPageSection.jsx";

export function AboutSection() {
  return (
    <FullPageSection id="habilidades" spacing="tight">
      <Box w="100%">
        <SectionHeader
          badge="Stack técnica"
          title="Habilidades que entregam resultados"
          description="Domínio em front-end, back-end, banco de dados e ferramentas — pronto para integrar times e liderar entregas de ponta a ponta."
        />

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: "3", md: "4" }} w="100%">
          {skillsData.map((category) => (
            <SkillCategory
              key={category.title}
              title={category.title}
              skills={category.skills}
              delay={category.delay}
            />
          ))}
        </SimpleGrid>
      </Box>
    </FullPageSection>
  );
}
