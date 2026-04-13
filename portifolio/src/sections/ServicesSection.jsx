import { FullPageSection } from "./FullPageSection.jsx";
import "../components/style.css";
import { useRef, useState, useEffect } from "react";
import { Reveal } from "../components/Reveal.jsx";
export function ServicesSection() {
  const timelineRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          obs.disconnect(); // anima só na primeira vez que entrar
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <FullPageSection id="experiencias">
      <div
        ref={timelineRef}
        className={`timeline ${animate ? "timeline--animate" : ""}`}
      >
        <Reveal delay={0.2}>
          <div className="container left-container">
            <div className="text-box">
              <h2>Desenvolvedor FullStack</h2>
              <small>06/2025 - Atual</small>
              <p>
                * Atuando atualmente como desenvolvedor FullStack. Resolvendo
                bugs, testes e implementando novas funcionalidades.
                <br />
                * Responsável por desenvolver e manter aplicações web (React) e
                mobile (Flutter), garantindo a qualidade do código e a
                satisfação dos usuários.
                <br />
                * Participando ativamente de todas as fases do desenvolvimento,
                desde a concepção até a implementação e manutenção.
                <br />
              </p>
              <span className="left-container-arrow"></span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="container right-container">
            <div className="text-box">
              <h2>Desenvolvedor Front-end</h2>
              <small>05/2022 - Atual</small>
              <p>
                * Atuação como desenvolvedor Front-end, focado em criar
                interfaces de usuário atraentes e funcionais.
                <br />
                * Responsável por desenvolver e manter aplicações web utilizando
                React, garantindo a qualidade do código e a satisfação dos
                usuários.
                <br />
                * Participação ativa em todas as fases do desenvolvimento, desde
                a concepção até a implementação e manutenção.
                <br />
              </p>
              <span className="right-container-arrow"></span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.6}>
          <div className="container left-container">
            <div className="text-box">
              <h2>Assistente Business Inteligence</h2>
              <small>01/2022 - Atual</small>
              <p>
                * Focado em analisar dados e fornecer insights para apoiar a
                tomada de decisões estratégicas.
                <br />
                * Responsável por organizar e analisar grandes volumes de dados
                utilizando SQL Server .<br />
                * Participação ativa na criação de dashboards e relatórios para
                monitorar o desempenho dos negócios e identificar oportunidades
                de melhoria.
                <br />
                * Querys otimizadas, ETL, Procedures e Views.
                <br />
              </p>
              <span className="left-container-arrow"></span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.8}>
          <div className="container right-container">
            <div className="text-box">
              <h2>Analista de Sistemas</h2>
              <small>06/2025 - Atual</small>
              <p>
                * Atuação como Analista de Sistemas, responsável por analisar,
                projetar e implementar soluções de software para atender às
                necessidades do negócio.
                <br />
                <br />
              </p>
              <span className="right-container-arrow"></span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={1.0}>
          <div className="container left-container">
            <div className="text-box">
              <h2>Desenvolvedor FullStack</h2>
              <small>06/2025 - Atual</small>
              <p>
                * Atuando atualmente como desenvolvedor FullStack. Resolvendo
                bugs, testes e implementando novas funcionalidades.
                <br />
              </p>
              <span className="left-container-arrow"></span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={1.2}>
          <div className="container right-container">
            <div className="text-box">
              <h2>Desenvolvedor FullStack</h2>
              <small>06/2025 - Atual</small>
              <p>
                * Atuando atualmente como desenvolvedor FullStack. Resolvendo
                bugs, testes e implementando novas funcionalidades.
                <br />* Responsável por desenvolver e manter aplicações web
                (React) e mobile (Flutter), garantindo a qualidade do código e a
                satisfação dos usuários.
              </p>
              <span className="right-container-arrow"></span>
            </div>
          </div>
        </Reveal>

        <div className="container left-container">
          <div className="text-box">
            <h2>Desenvolvedor FullStack</h2>
            <small>06/2025 - Atual</small>
            <p>
              * Atuando atualmente como desenvolvedor FullStack. Resolvendo
              bugs, testes e implementando novas funcionalidades.
              <br />
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>
      </div>
    </FullPageSection>
  );
}
