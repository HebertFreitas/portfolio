import { Box, SimpleGrid } from "@chakra-ui/react";
import { FullPageSection } from "./FullPageSection.jsx";
import { SkillCategory } from "../components/SkillCategory.jsx";
import { skillsData } from "../data/skillsData.js";

export function AboutSection() {
  return (
    <FullPageSection id="habilidades">
      <Box w="100%">
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" w="100%">
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