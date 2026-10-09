import { useEffect, useRef, useState } from "react";
import { motion as Motion, useReducedMotion } from "motion/react";
import { createOpeningStage } from "../lib/openingStage.js";
import { createButtonEntrance } from "../lib/openingButtonEntrance.js";
import { playOpeningExitSound } from "../lib/openingSound.js";

export function Opening({ onEnter }) {
  const canvas = useRef(null);
  const dialog = useRef(null);
  const enter = useRef(null);
  const sound = useRef(null);
  const trace = useRef(null);
  const skip = useRef(null);
  const [muted, setMuted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [fallback, setFallback] = useState(false);
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [buttonReady, setButtonReady] = useState(false);
  const exit = () => {
    if (leaving) return;
    setLeaving(true);
  };
  const enterSite = () => {
    if (leaving) return;
    if (!muted)
      sound.current = playOpeningExitSound(
        window.AudioContext || window.webkitAudioContext,
      );
    exit();
  };
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (event) => {
      if (event.key === "Escape") skip.current?.click();
    };
    window.addEventListener("keydown", key);
    dialog.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", key);
      sound.current?.close();
    };
  }, []);
  useEffect(
    () =>
      createOpeningStage(canvas.current, {
        reduced,
        onReady: () => setReady(true),
        onError: () => {
          setFallback(true);
          setReady(true);
        },
      }),
    [reduced],
  );
  useEffect(() => {
    if (!ready) return;
    return createButtonEntrance(trace.current, enter.current, dialog.current, {
      reduced,
      onReady: () => setButtonReady(true),
    });
  }, [ready, reduced]);
  const toggleSound = () => setMuted((value) => !value);
  return (
    <Motion.div
      className={`opening ${leaving ? "leaving" : ""}`}
      ref={dialog}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Apresentação de Hebert Dev"
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: reduced ? 0.01 : 0.8 }}
      onAnimationComplete={() => {
        if (leaving) onEnter();
      }}
    >
      <canvas ref={canvas} aria-hidden="true" />
      <canvas ref={trace} className="opening-trace-canvas" aria-hidden="true" />
      <div className="opening-controls">
        <button type="button" onClick={toggleSound} aria-pressed={!muted}>
          <span
            className={`sound-bars ${muted ? "muted" : ""}`}
            aria-hidden="true"
          >
            <i />
            <i />
            <i />
          </span>
          <span>Som {muted ? "desligado" : "ligado"}</span>
        </button>
        <button ref={skip} type="button" onClick={exit}>
          Pular abertura
        </button>
      </div>
      {fallback && <h1 className="opening-fallback">HEBERT DEV</h1>}
      <Motion.p
        className="opening-caption"
        initial={{ opacity: 0, filter: "blur(12px)" }}
        animate={{
          opacity: ready ? 1 : 0,
          filter: ready ? "blur(0px)" : "blur(12px)",
        }}
        transition={{ duration: reduced ? 0 : 1 }}
      >
        Web, Mobile & Soluções Full Stack
      </Motion.p>
      <button
        ref={enter}
        className={`opening-enter ${buttonReady ? "button-ready" : ""}`}
        onClick={enterSite}
        disabled={!buttonReady || leaving}
      >
        <span className="opening-enter-glow" aria-hidden="true" />
        <span className="opening-enter-text">Quem é Hebert Dev?</span>
      </button>
      <div className="opening-wash" aria-hidden="true" />
    </Motion.div>
  );
}
