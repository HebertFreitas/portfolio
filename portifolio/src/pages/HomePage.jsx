import { Stack } from "@chakra-ui/react";
import { useFullPageScroll } from "../layout/useFullPageScroll.jsx";
import { PageFrame } from "../layout/PageFrame.jsx";
import { AboutSection } from "../sections/AboutSection.jsx";
import { ContactSection } from "../sections/ContactSection.jsx";
import { HeroSection } from "../sections/HeroSection.jsx";
import { KnowledgeSection } from "../sections/KnowledgeSection.jsx";
import { ServicesSection } from "../sections/ServicesSection.jsx";

export function HomePage() {
  useFullPageScroll(
    ["inicio", "habilidades", "experiencias", "conhecimento", "contato"],
    true,
  );
  return (
    <PageFrame>
      <Stack gap="0">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <KnowledgeSection />
        <ContactSection />
      </Stack>
    </PageFrame>
  );
}
