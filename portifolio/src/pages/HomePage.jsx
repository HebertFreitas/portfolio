import { Stack } from "@chakra-ui/react";

import { PageFrame } from "../layout/PageFrame.jsx";
import { AboutSection } from "../sections/AboutSection.jsx";
import { ContactSection } from "../sections/ContactSection.jsx";
import { HeroSection } from "../sections/HeroSection.jsx";
import { KnowledgeSection } from "../sections/KnowledgeSection.jsx";
import { ProjectsSection } from "../sections/ProjectsSection.jsx";
import { ServicesSection } from "../sections/ServicesSection.jsx";

export function HomePage() {
  return (
    <PageFrame>
      <Stack gap="0">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <KnowledgeSection />
        <ContactSection />
      </Stack>
    </PageFrame>
  );
}
