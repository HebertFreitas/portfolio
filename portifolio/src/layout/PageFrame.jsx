import {
  Box,
  Drawer,
  HStack,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

import { ThemeToggle } from "../components/ThemeToggle.jsx";

const navItems = [
  { label: "INICIO", to: "/#inicio", id: "inicio" },
  { label: "HABILIDADES", to: "/#habilidades", id: "habilidades" },
  { label: "EXPERIÊNCIAS", to: "/#experiencias", id: "experiencias" },
  { label: "CONHECIMENTO", to: "/#conhecimento", id: "conhecimento" },
  { label: "CONTATO", to: "/#contato", id: "contato" },
];

export function PageFrame({ children }) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("inicio");
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  const activeKey = useMemo(() => {
    if (isHome) return activeId;
    // When on other routes, highlight by pathname
    const map = {
      "/": "inicio",
      "/habilidades": "habilidades",
      "/experiencias": "experiencias",
      "/conhecimento": "conhecimento",
      "/contato": "contato",
    };
    return map[location.pathname] ?? "inicio";
  }, [activeId, isHome, location.pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const ids = navItems.map((n) => n.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0];
        const id = visible?.target?.id;
        if (id) setActiveId(id);
      },
      {
        root: null,
        threshold: [0.25, 0.4, 0.6],
        rootMargin: "-20% 0px -55% 0px",
      },
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [isHome]);

  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    setOpen(false);

    if (isHome) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `/#${id}`);
      }
      return;
    }

    navigate(`/#${id}`);
  };

  return (
    <Box position="relative" overflowX="hidden">
      <Box
        position="absolute"
        inset="0"
        pointerEvents="none"
        bg={{
          base: "radial-gradient(900px 450px at 20% 10%, rgba(124,58,237,0.10), transparent 55%), radial-gradient(900px 520px at 85% 35%, rgba(0,0,0,0.06), transparent 60%)",
          _dark:
            "radial-gradient(900px 450px at 18% 10%, rgba(124,58,237,0.22), transparent 55%), radial-gradient(900px 520px at 85% 35%, rgba(255,255,255,0.10), transparent 60%)",
        }}
      />

      <Box position="relative">
        <Box
          as="header"
          position="fixed"
          top="0"
          left="0"
          right="0"
          zIndex="50"
          px={{ base: "4", md: "10" }}
          py={{ base: "4", md: "5" }}
          bg={{
            base: "bg",
            _dark: isScrolled ? "rgba(0,0,0,0.78)" : "rgba(0,0,0,0.55)",
          }}
          borderBottomWidth="1px"
          borderColor={{ base: "border", _dark: "whiteAlpha.200" }}
          backdropFilter={{ _dark: "blur(14px)" }}
        >
          <Box
            position="absolute"
            inset="0"
            pointerEvents="none"
            opacity={{ base: 0, _dark: 1 }}
            bg="radial-gradient(700px 260px at 30% 0%, rgba(255,255,255,0.08), transparent 60%)"
          />
          <Box position="relative" maxW="100%" mx="auto">
            <HStack w="full" justify="space-between" align="center" gap="6">
              {/* <Text
                color={{ base: "fg.muted", _dark: "whiteAlpha.700" }}
                fontSize="sm"
                whiteSpace="nowrap"
              >
                Portfólio • Full Stack
              </Text> */}

              <HStack ml="auto" gap="2" align="center">
                <HStack
                  gap={{ base: "2", lg: "7" }}
                  display={{ base: "none", md: "flex" }}
                  align="center"
                >
                  {navItems.map((item) => (
                    <Link
                      key={item.id}
                      as={NavLink}
                      to={item.to}
                      fontSize="xs"
                      letterSpacing="wider"
                      textTransform="uppercase"
                      color={
                        activeKey === item.id
                          ? { base: "fg", _dark: "whiteAlpha.900" }
                          : { base: "fg.muted", _dark: "whiteAlpha.700" }
                      }
                      _hover={{
                        color: { base: "fg", _dark: "whiteAlpha.900" },
                      }}
                      fontWeight={activeKey === item.id ? "800" : "500"}
                      onClick={handleNavClick(item.id)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </HStack>

                <ThemeToggle />

                <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
                  <Drawer.Trigger asChild>
                    <IconButton
                      display={{ base: "inline-flex", md: "none" }}
                      variant="ghost"
                      size="sm"
                      aria-label="Abrir menu"
                    >
                      <FiMenu />
                    </IconButton>
                  </Drawer.Trigger>

                  <Drawer.Backdrop />
                  <Drawer.Positioner>
                    <Drawer.Content bg="bg" color="fg">
                      <Drawer.Header
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Text fontWeight="700" letterSpacing="wider">
                          Menu
                        </Text>
                        <Drawer.CloseTrigger asChild>
                          <IconButton
                            variant="ghost"
                            size="sm"
                            aria-label="Fechar menu"
                          >
                            <FiX />
                          </IconButton>
                        </Drawer.CloseTrigger>
                      </Drawer.Header>
                      <Drawer.Body>
                        <Stack gap="3">
                          {navItems.map((item) => (
                            <Link
                              key={item.id}
                              as={NavLink}
                              to={item.to}
                              fontSize="sm"
                              letterSpacing="wider"
                              textTransform="uppercase"
                              color={activeKey === item.id ? "fg" : "fg.muted"}
                              _hover={{ color: "fg" }}
                              fontWeight={activeKey === item.id ? "700" : "500"}
                              onClick={handleNavClick(item.id)}
                              w="fit-content"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </Stack>
                      </Drawer.Body>
                    </Drawer.Content>
                  </Drawer.Positioner>
                </Drawer.Root>
              </HStack>
            </HStack>
          </Box>
        </Box>

        <Box
          position="relative"
          px={{ base: "4", md: "10" }}
          pt={{ base: "90px", md: "92px" }}
        >
          <Box maxW="80%" mx="auto" w="full">
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
