import { Text, Box, SimpleGrid, Image, VStack } from "@chakra-ui/react";

import { FullPageSection } from "./FullPageSection.jsx";
import { GlassCard } from "./GlassCard.jsx";
import { Reveal } from "../components/Reveal.jsx";

export function AboutSection() {
  return (
    <FullPageSection id="habilidades">
      <Box w="100%">
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" w="100%">
          <Reveal delay={0.4}>
            <GlassCard maxW="100%" height="100%">
              <Text
                fontWeight="700"
                letterSpacing="wider"
                textTransform="uppercase"
                mb="4"
                ml="2"
              >
                Front-end
              </Text>
              <SimpleGrid columns={{ base: 2, md: 4 }} gap="4" w="100%">
                <GlassCard maxW="100%">
                  <VStack gap="3">
                    <Box
                      boxSize="100px" // mesmo tamanho para todas
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src="/uploads/flutter.png"
                        alt="Flutter"
                        maxW="100%"
                        maxH="100%"
                        objectFit="contain"
                      />
                    </Box>

                    <Text fontSize="lg" fontWeight="800">
                      Flutter
                    </Text>
                  </VStack>
                </GlassCard>
                <GlassCard maxW="100%">
                  <VStack gap="3">
                    <Box
                      boxSize="100px" // mesmo tamanho para todas
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src="/uploads/dart.png"
                        alt="Dart"
                        maxW="100%"
                        maxH="100%"
                        objectFit="contain"
                      />
                    </Box>

                    <Text fontSize="lg" fontWeight="800">
                      Dart
                    </Text>
                  </VStack>
                </GlassCard>
                <GlassCard maxW="100%">
                  <VStack gap="3">
                    <Box
                      boxSize="100px" // mesmo tamanho para todas
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src="/uploads/react.png"
                        alt="React"
                        maxW="100%"
                        maxH="100%"
                        objectFit="contain"
                      />
                    </Box>

                    <Text fontSize="lg" fontWeight="800">
                      React
                    </Text>
                  </VStack>
                </GlassCard>
                <GlassCard maxW="100%">
                  <VStack gap="3">
                    <Box
                      boxSize="100px" // mesmo tamanho para todas
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src="/uploads/html.png"
                        alt="HTML"
                        maxW="100%"
                        maxH="100%"
                        objectFit="contain"
                      />
                    </Box>

                    <Text fontSize="lg" fontWeight="800">
                      HTML
                    </Text>
                  </VStack>
                </GlassCard>
                <GlassCard maxW="100%">
                  <VStack gap="3">
                    <Box
                      boxSize="100px" // mesmo tamanho para todas
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src="/uploads/css.png"
                        alt="CSS"
                        maxW="100%"
                        maxH="100%"
                        objectFit="contain"
                      />
                    </Box>

                    <Text fontSize="lg" fontWeight="800">
                      CSS
                    </Text>
                  </VStack>
                </GlassCard>
                <GlassCard maxW="100%">
                  <VStack gap="3">
                    <Box
                      boxSize="100px" // mesmo tamanho para todas
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src="/uploads/js.png"
                        alt="JavaScript"
                        maxW="100%"
                        maxH="100%"
                        objectFit="contain"
                      />
                    </Box>

                    <Text fontSize="lg" fontWeight="800">
                      JavaScript
                    </Text>
                  </VStack>
                </GlassCard>
                <GlassCard maxW="100%">
                  <VStack gap="3">
                    <Box
                      boxSize="100px" // mesmo tamanho para todas
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src="/uploads/ts.png"
                        alt="TypeScript"
                        maxW="100%"
                        maxH="100%"
                        objectFit="contain"
                      />
                    </Box>

                    <Text fontSize="lg" fontWeight="800">
                      TypeScript
                    </Text>
                  </VStack>
                </GlassCard>
              </SimpleGrid>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.8}>
            <GlassCard maxW="100%" height="100%">
              <Text
                fontWeight="700"
                letterSpacing="wider"
                textTransform="uppercase"
                mb="2"
                ml="2"
              >
                Back-end
              </Text>
              <SimpleGrid columns={{ base: 2, md: 4 }} gap="4" w="100%">
                <GlassCard maxW="100%">
                  <VStack gap="3">
                    <Box
                      boxSize="100px" // mesmo tamanho para todas
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src="/uploads/csharp.png"
                        alt="C#"
                        maxW="100%"
                        maxH="100%"
                        objectFit="contain"
                      />
                    </Box>

                    <Text fontSize="lg" fontWeight="800">
                      C#
                    </Text>
                  </VStack>
                </GlassCard>

                <GlassCard maxW="100%">
                  <VStack gap="3">
                    <Box
                      boxSize="100px" // mesmo tamanho para todas
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src="/uploads/dotnet.png"
                        alt=".NET"
                        maxW="100%"
                        maxH="100%"
                        objectFit="contain"
                      />
                    </Box>

                    <Text fontSize="lg" fontWeight="800">
                      .NET
                    </Text>
                  </VStack>
                </GlassCard>
                <GlassCard maxW="100%">
                  <VStack gap="3">
                    <Box
                      boxSize="100px" // mesmo tamanho para todas
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src="/uploads/firebase.png"
                        alt="Firebase"
                        maxW="100%"
                        maxH="100%"
                        objectFit="contain"
                      />
                    </Box>

                    <Text fontSize="lg" fontWeight="800">
                      Firebase
                    </Text>
                  </VStack>
                </GlassCard>
              </SimpleGrid>
            </GlassCard>
          </Reveal>
          <Reveal delay={1.2}>
            <GlassCard maxW="100%" height="100%">
              <Text
                fontWeight="700"
                letterSpacing="wider"
                textTransform="uppercase"
                mb="2"
                ml="2"
              >
                Banco de Dados
              </Text>
              <SimpleGrid columns={{ base: 2, md: 4 }} gap="4" w="100%">
                <GlassCard maxW="100%">
                  <VStack gap="3">
                    <Box
                      boxSize="100px" // mesmo tamanho para todas
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src="/uploads/sql.png"
                        alt="SQL Server"
                        maxW="100%"
                        maxH="100%"
                        objectFit="contain"
                      />
                    </Box>

                    <Text fontSize="lg" fontWeight="800">
                      SQL Server
                    </Text>
                  </VStack>
                </GlassCard>

                <GlassCard maxW="100%">
                  <VStack gap="3">
                    <Box
                      boxSize="100px" // mesmo tamanho para todas
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src="/uploads/mysql.png"
                        alt="MySQL"
                        maxW="100%"
                        maxH="100%"
                        objectFit="contain"
                      />
                    </Box>

                    <Text fontSize="lg" fontWeight="800">
                      MySQL
                    </Text>
                  </VStack>
                </GlassCard>
                <GlassCard maxW="100%">
                  <VStack gap="3">
                    <Box
                      boxSize="100px" // mesmo tamanho para todas
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src="/uploads/firebase.png"
                        alt="Firebase"
                        maxW="100%"
                        maxH="100%"
                        objectFit="contain"
                      />
                    </Box>

                    <Text fontSize="lg" fontWeight="800">
                      NoSQL
                    </Text>
                  </VStack>
                </GlassCard>
              </SimpleGrid>
            </GlassCard>
          </Reveal>
          <Reveal delay={1.6}>
            <GlassCard maxW="100%" height="100%">
              <Text
                fontWeight="700"
                letterSpacing="wider"
                textTransform="uppercase"
                mb="2"
                ml="2"
              >
                Ferramentas
              </Text>
              <SimpleGrid columns={{ base: 2, md: 4 }} gap="4" w="100%">
                <GlassCard maxW="100%">
                  <VStack gap="3">
                    <Box
                      boxSize="100px" // mesmo tamanho para todas
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src="/uploads/postman.png"
                        alt="Postman"
                        maxW="100%"
                        maxH="100%"
                        objectFit="contain"
                      />
                    </Box>

                    <Text fontSize="lg" fontWeight="800">
                      Postman
                    </Text>
                  </VStack>
                </GlassCard>

                <GlassCard maxW="100%">
                  <VStack gap="3">
                    <Box
                      boxSize="100px" // mesmo tamanho para todas
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src="/uploads/github.png"
                        alt="GitHub"
                        maxW="130%"
                        maxH="130%"
                        objectFit="contain"
                      />
                    </Box>

                    <Text fontSize="lg" fontWeight="800">
                      GitHub
                    </Text>
                  </VStack>
                </GlassCard>
                <GlassCard maxW="100%">
                  <VStack gap="3">
                    <Box
                      boxSize="100px" // mesmo tamanho para todas
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src="/uploads/git.png"
                        alt="Git"
                        maxW="100%"
                        maxH="100%"
                        objectFit="contain"
                      />
                    </Box>

                    <Text fontSize="lg" fontWeight="800">
                      Git
                    </Text>
                  </VStack>
                </GlassCard>
                <GlassCard maxW="100%">
                  <VStack gap="3">
                    <Box
                      boxSize="100px" // mesmo tamanho para todas
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src="/uploads/devops1.png"
                        alt="DevOps"
                        maxW="200%"
                        maxH="100%"
                        objectFit="contain"
                      />
                    </Box>

                    <Text fontSize="lg" fontWeight="800">
                      DevOps
                    </Text>
                  </VStack>
                </GlassCard>
                <GlassCard maxW="100%">
                  <VStack gap="3">
                    <Box
                      boxSize="100px" // mesmo tamanho para todas
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src="/uploads/figma.png"
                        alt="Figma"
                        maxW="100%"
                        maxH="100%"
                        objectFit="contain"
                      />
                    </Box>

                    <Text fontSize="lg" fontWeight="800">
                      Figma
                    </Text>
                  </VStack>
                </GlassCard>
              </SimpleGrid>
            </GlassCard>
          </Reveal>
        </SimpleGrid>
      </Box>
    </FullPageSection>
  );
}
