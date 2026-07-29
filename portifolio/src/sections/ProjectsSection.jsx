import { Box, SimpleGrid } from "@chakra-ui/react";

import { ProjectCard } from "../components/ProjectCard.jsx";
import { SectionHeader } from "../components/SectionHeader.jsx";
import { Stagger, StaggerItem } from "../components/Stagger.jsx";
import { projectsData } from "../data/projectsData.js";
import { FullPageSection } from "./FullPageSection.jsx";

export function ProjectsSection() {
  return (
    <FullPageSection id="projetos" spacing="tight">
      <Box w="full">
        <SectionHeader
          badge="Portfólio"
          title="Projetos que desenvolvi"
          description="Uma seleção de aplicações web, mobile e full stack — do conceito à entrega, com código limpo e foco em experiência do usuário."
        />

        <Stagger stagger={0.08}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: "4", md: "5" }} w="full">
            {projectsData.map((project) => (
              <StaggerItem key={project.id} y={20}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </SimpleGrid>
        </Stagger>
      </Box>
    </FullPageSection>
  );
}
