import { Text, SimpleGrid } from "@chakra-ui/react";
import { GlassCard } from "./GlassCard.jsx";
import { SkillCard } from "../components/SkillCard.jsx";
import { Reveal } from "../components/Reveal.jsx";

export function SkillCategory({ title, skills, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <GlassCard maxW="100%" height="100%">
        <Text
          fontWeight="700"
          letterSpacing="wider"
          textTransform="uppercase"
          mb="4"
          ml="2"
        >
          {title}
        </Text>
        <SimpleGrid columns={{ base: 2, md: 4 }} gap="4" w="100%">
          {skills.map((skill) => (
            <SkillCard
              key={skill.name}
              icon={skill.icon}
              name={skill.name}
              iconSize={skill.iconSize}
            />
          ))}
        </SimpleGrid>
      </GlassCard>
    </Reveal>
  );
}