import { Box, IconButton } from "@chakra-ui/react";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

import { motionTokens } from "../lib/motionTokens.js";

const MotionBox = motion.create(Box);

export function FloatingActions() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 700);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <MotionBox
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="100"
        h="3px"
        bg="#3b82f6"
        transformOrigin="0% 50%"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
      <AnimatePresence>
        {visible ? (
          <MotionBox
            position="fixed"
            right={{ base: "16px", md: "28px" }}
            bottom={{ base: "16px", md: "28px" }}
            zIndex="40"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={motionTokens.spring.quick}
          >
            <IconButton
              aria-label="Voltar ao topo"
              rounded="full"
              size="lg"
              bg="#3b82f6"
              color="white"
              boxShadow="0 14px 34px rgba(0,0,0,.28)"
              _hover={{ bg: "#2563eb", transform: "translateY(-3px)" }}
              transition="background .25s ease, transform .25s ease"
              onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
            >
              <FiArrowUp />
            </IconButton>
          </MotionBox>
        ) : null}
      </AnimatePresence>
    </>
  );
}
