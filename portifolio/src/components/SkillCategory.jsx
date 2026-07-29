import { Text, SimpleGrid } from "@chakra-ui/react";

import { GlassCard } from "./GlassCard.jsx";
import { SkillCard } from "../components/SkillCard.jsx";
import { Reveal } from "../components/Reveal.jsx";

export function SkillCategory({ title, skills, delay = 0 }) {
  return (
    <Reveal delay={delay} duration={0.35} y={16} amount={0.08}>
      <GlassCard maxW="100%" height="100%" p={{ base: "3", sm: "4", md: "5" }}>
        <Text
          fontWeight="700"
          letterSpacing="wider"
          textTransform="uppercase"
          mb={{ base: "2", md: "3" }}
          ml={{ base: "0", md: "2" }}
          fontSize={{ base: "xs", md: "sm" }}
          textAlign={{ base: "center", md: "left" }}
        >
          {title}
        </Text>
        <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} gap={{ base: "2", md: "3" }} w="100%">
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
