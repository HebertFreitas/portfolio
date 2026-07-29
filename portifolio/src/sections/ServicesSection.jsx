import { Box } from "@chakra-ui/react";

import { ExperienceTimeline } from "../components/ExperienceTimeline.jsx";
import { SectionHeader } from "../components/SectionHeader.jsx";
import { experiencesData } from "../data/experiencesData.js";
import { FullPageSection } from "./FullPageSection.jsx";

export function ServicesSection() {
  return (
    <FullPageSection id="experiencias" spacing="tight">
      <Box w="full">
        <SectionHeader
          badge="Trajetória"
          title="Experiências que moldaram minha carreira"
          description="Projetos acadêmicos, pessoais e profissionais que consolidaram minha visão full stack — da interface ao banco de dados."
        />

        <ExperienceTimeline experiences={experiencesData} />
      </Box>
    </FullPageSection>
  );
}
