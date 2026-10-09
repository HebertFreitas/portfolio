import { Box, HStack, Link } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

import { FloatingActions } from "../components/FloatingActions.jsx";
import { ThemeToggle } from "../components/ThemeToggle.jsx";
import { motionTokens, staggerContainer } from "../lib/motionTokens.js";

const MotionBox = motion.create(Box);

const navItems = [
  { label: "INICIO", to: "/#inicio", id: "inicio" },
  { label: "HABILIDADES", to: "/#habilidades", id: "habilidades" },
  { label: "EXPERIÊNCIAS", to: "/#experiencias", id: "experiencias" },
  { label: "PROJETOS", to: "/#projetos", id: "projetos" },
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
      "/projetos": "projetos",
      "/conhecimento": "conhecimento",
      "/contato": "contato",
    };
    return map[location.pathname] ?? "inicio";
  }, [activeId, isHome, location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const headerOffset = window.innerWidth < 768 ? 76 : 96;

    const updateActiveSection = () => {
      const ids = navItems.map((n) => n.id);
      const marker = window.scrollY + headerOffset + window.innerHeight * 0.3;

      let current = ids[0];

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) {
          current = id;
        }
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8;

      if (atBottom) {
        current = ids[ids.length - 1];
      }

      setActiveId((prev) => (prev === current ? prev : current));
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [isHome]);

  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    setActiveId(id);

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
      <MotionBox
        position="absolute"
        inset="0"
        pointerEvents="none"
        bg={{ base: "radial-gradient(900px 520px at 18% 8%, rgba(59,130,246,.10), transparent 60%)", _dark: "radial-gradient(900px 520px at 18% 8%, rgba(59,130,246,.12), transparent 60%)" }}
      />

      <Box position="relative">
        <MotionBox
          as="header"
          position="fixed"
          top="0"
          left="0"
          right="0"
          zIndex="50"
          px={{ base: "3", md: "10" }}
          py={{ base: "3", md: isScrolled ? "3" : "5" }}
          style={{ transition: "padding .35s ease, background-color .35s ease" }}
          bg={{ base: isScrolled || open ? "rgba(249,249,247,.9)" : "rgba(249,249,247,.68)", _dark: isScrolled || open ? "rgba(17,21,25,.92)" : "rgba(17,21,25,.52)" }}
          borderBottomWidth="1px"
          borderColor={{ base: "border", _dark: "whiteAlpha.200" }}
          backdropFilter="blur(14px)"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: motionTokens.duration.slow, delay: 0.2, ease: motionTokens.ease }}
        >
          <Box
            position="absolute"
            inset="0"
            pointerEvents="none"
            opacity={{ base: 0, _dark: 1 }}
            bg="radial-gradient(700px 260px at 30% 0%, rgba(255, 255, 255, 0.08), transparent 60%)"
          />
          <Box position="relative" maxW="100%" mx="auto">
            <HStack w="full" justify="space-between" align="center" gap="6">

              <a
                className="brand-mark"
                href="/#inicio"
                aria-label="Hebert Freitas, voltar ao início"
                onClick={handleNavClick("inicio")}
              >
                <img src="/iniciais_logo.png" alt="" width="44" height="44" />
                <small>Hebert Freitas</small>
              </a>

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
                      position="relative"
                      py="2"
                      onClick={handleNavClick(item.id)}
                    >
                      {item.label}
                      {activeKey === item.id ? (
                        <MotionBox layoutId="nav-underline" position="absolute" left="0" right="0" bottom="0" h="2px" bg="#3b82f6" transition={motionTokens.spring.quick} />
                      ) : null}
                    </Link>
                  ))}
                </HStack>

                <ThemeToggle />

                <button
                  type="button"
                  className={`burger ${open ? "is-open" : ""}`}
                  aria-label={open ? "Fechar menu" : "Abrir menu"}
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                  onClick={() => setOpen((o) => !o)}
                >
                  <span />
                  <span />
                </button>
              </HStack>
            </HStack>
          </Box>
        </MotionBox>

        <AnimatePresence>
          {open && (
            <motion.div
              key="menu"
              id="mobile-menu"
              className="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: motionTokens.duration.fast }}
            >
              <motion.nav
                aria-label="Menu"
                variants={staggerContainer(motionTokens.stagger.tight, 0.08)}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {navItems.map((item) => (
                  <motion.a
                    key={item.id}
                    href={item.to}
                    className={activeKey === item.id ? "is-active" : ""}
                    aria-current={activeKey === item.id ? "true" : undefined}
                    onClick={handleNavClick(item.id)}
                    variants={{
                      hidden: { opacity: 0, x: -motionTokens.distance.medium },
                      visible: { opacity: 1, x: 0, transition: motionTokens.spring.gentle },
                    }}
                  >
                    {item.label.charAt(0) + item.label.slice(1).toLowerCase()}
                  </motion.a>
                ))}
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>

        <Box
          position="relative"
          px={{ base: "4", sm: "5", md: "10" }}
          pt={{ base: "76px", md: "92px" }}
          pb={{ base: "6", md: "0" }}
        >
          <Box maxW="1200px" mx="auto" w="full">
            {children}
          </Box>
        </Box>
      </Box>
      <FloatingActions />
    </Box>
  );
}
