import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { projectsData } from "./data/projectsData";
import { experiencesData } from "./data/experiencesData";
import { skillsData } from "./data/skillsData";
import { RESUME_URL, RESUME_FILENAME } from "./data/siteLinks";
import { Opening } from "./components/Opening";
import { usePortfolioEffects } from "./lib/usePortfolioEffects";

const whatsapp = "https://wa.me/5531991059695";
const linkedin = "https://www.linkedin.com/in/hebert-freitas-775093175/";
const github = "https://github.com/HebertFreitas";
const services = [
  [
    "Sites profissionais",
    "Sites e landing pages responsivos, rápidos e pensados para apresentar sua marca e transformar visitas em conversas.",
  ],
  [
    "Sistemas sob medida",
    "Agendamento, autenticação, dashboards e gestão. Aplicações que acompanham o fluxo real do seu negócio.",
  ],
  [
    "Aplicativos mobile",
    "Apps para Android e iOS com Flutter e Dart, integrados aos serviços e dados que sua empresa precisa.",
  ],
  [
    "Back-end e APIs",
    "APIs REST com C# e .NET. Integrações que conectam interfaces, serviços e processos em uma solução completa.",
  ],
  [
    "Banco de dados",
    "Modelagem, consultas e integração com SQL Server, MySQL e Firebase. Dados organizados para sustentar o crescimento.",
  ],
  [
    "Interfaces e experiência",
    "Do protótipo no Figma à interface em React e TypeScript, com atenção à usabilidade e a cada tamanho de tela.",
  ],
];

function Reveal({ children, className = "", as = "div", delay = 0 }) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={`revelar ${className}`}
      initial={reduced ? false : { opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduced ? 0 : 0.95,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      {children}
    </Tag>
  );
}
function Title({ children, className = "" }) {
  const reduced = useReducedMotion();
  return (
    <motion.h2
      className={`display ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.045 }}
    >
      {children.map((part, i) => (
        <span key={i} className="title-part">
          {part.text.split(" ").map((word, j) => (
            <span className={`pal ${part.em ? "em" : ""}`} key={j}>
              <motion.i
                variants={{
                  hidden: { y: reduced ? 0 : "110%" },
                  visible: { y: 0 },
                }}
                transition={{
                  duration: reduced ? 0 : 1.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.i>{" "}
            </span>
          ))}{" "}
        </span>
      ))}
    </motion.h2>
  );
}
function Brand() {
  return (
    <a
      className="marca"
      href="#inicio"
      aria-label="Hebert Freitas, ir ao início"
    >
      <span className="hf-mark" aria-hidden="true">
        HF
        <span />
      </span>
      <span className="marca-nome">
        Hebert<span className="marca-dev">Freitas</span>
      </span>
    </a>
  );
}
function Project({ project, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <Reveal as="article" className="caso">
      <div data-aberto={open}>
        <button
          className="caso-topo"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={`project-${project.id}`}
        >
          <span className="caso-nome display">{project.title}</span>
          <span className="caso-tags">
            {project.stack.slice(0, 3).map((tag) => (
              <span className="caso-tag rotulo" key={tag}>
                {tag}
              </span>
            ))}
          </span>
          <span className="caso-sinal" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
        <div
          className="caso-painel"
          id={`project-${project.id}`}
          inert={!open ? true : undefined}
        >
          <div className="caso-painel-interno">
            <p className="caso-texto">{project.description}</p>
            <div className="project-gallery">
              <figure className="project-preview">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`Prévia de ${project.title}`}
                    loading="lazy"
                  />
                ) : (
                  <div className="portfolio-preview">
                    <span className="rotulo">HEBERT FREITAS · FULL STACK</span>
                    <strong>
                      Ideias que viram
                      <br />
                      <em>experiências.</em>
                    </strong>
                    <img
                      src="/uploads/hebert-portrait-gray.png"
                      alt="Retrato de Hebert Freitas no portfólio"
                      loading="lazy"
                    />
                    <span className="preview-foot">REACT / FLUTTER / .NET</span>
                  </div>
                )}
              </figure>
              <div className="project-detail">
                <p className="rotulo">Tecnologias</p>
                <div className="project-stack">
                  {project.stack.map((tag) => (
                    <span className="caso-tag rotulo" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  className="botao"
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Ver projeto</span>
                  <FiArrowRight className="seta" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
export default function App() {
  const [entered, setEntered] = useState(() => Boolean(window.location.hash));
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("inicio");
  const portrait = useRef(null);
  const origin = useRef(null);
  const destination = useRef(null);
  usePortfolioEffects({ entered, portrait, origin, destination, setActive });
  useEffect(() => {
    if (!menu) return;
    const close = (event) => {
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menu]);
  return (
    <>
      <a className="skip-link" href="#sobre">
        Pular para o conteúdo
      </a>
      {!entered && <Opening onEnter={() => setEntered(true)} />}
      <canvas id="textura" aria-hidden="true" />
      <div className="cursor" aria-hidden="true" />
      <div className="cursor-anel" aria-hidden="true" />
      <header className="cabeca" inert={!entered ? true : undefined}>
        <Brand />
        <nav className={`menu ${menu ? "menu-open" : ""}`} aria-label="Seções">
          {[
            ["sobre", "Sobre"],
            ["trabalhos", "Trabalhos"],
            ["servicos", "Serviços"],
          ].map(([id, label]) => (
            <a
              key={id}
              className={active === id ? "ativo" : ""}
              href={`#${id}`}
              onClick={() => setMenu(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="botao botao--solido cabeca-cta"
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            <span>Entrar em contato</span>
            <FiArrowRight className="seta" />
          </a>
          <button
            className={`menu-toggle ${menu ? "is-open" : ""}`}
            aria-expanded={menu}
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenu(!menu)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <main inert={!entered ? true : undefined}>
        <section className="secao secao--liso inicio" id="inicio">
          <div className="rosto-slot rosto-slot--inicio" ref={origin} />
          <div className="envelope inicio-texto">
            <Reveal as="p" className="rotulo">
              Hebert Freitas · Belo Horizonte – MG
            </Reveal>
            <motion.h1
              className="display inicio-tese"
              initial={false}
              animate={{ opacity: entered ? 1 : 0, y: entered ? 0 : 28 }}
              transition={{ duration: 1, delay: 0.15 }}
            >
              Não é apenas um projeto <em>“bonitinho”</em>.
            </motion.h1>
            <Reveal as="p" className="inicio-ponte" delay={0.15}>
              Tecnologia que entrega
            </Reveal>
            <ul className="inicio-lista">
              {["experiência.", "performance.", "resultado."].map((word, i) => (
                <Reveal
                  as="li"
                  className="display dentro"
                  key={word}
                  delay={0.2 + i * 0.1}
                >
                  {word}
                </Reveal>
              ))}
            </ul>
            <Reveal>
              <a className="inicio-desce" href="#sobre">
                <span className="rotulo">Quem eu sou</span>
                <span className="inicio-desce-fio" />
              </a>
            </Reveal>
          </div>
        </section>
        <section className="secao secao--textura sobre" id="sobre">
          <div className="envelope">
            <Reveal as="p" className="rotulo">
              Sobre mim
            </Reveal>
            <Title className="sobre-tese">
              {[
                { text: "Transformo ideias em produtos digitais" },
                { text: "completos", em: true },
                { text: "— da interface ao banco de dados." },
              ]}
            </Title>
            <div className="sobre-corpo">
              <figure className="sobre-foto">
                <div
                  className="rosto-slot rosto-slot--destino"
                  ref={destination}
                />
                <Reveal as="ul" className="numeros">
                  <li>
                    <b>Web</b>
                    <span className="rotulo">React & TypeScript</span>
                  </li>
                  <li>
                    <b>Mobile</b>
                    <span className="rotulo">Flutter & Dart</span>
                  </li>
                  <li>
                    <b>APIs</b>
                    <span className="rotulo">C# & .NET</span>
                  </li>
                </Reveal>
              </figure>
              <div className="sobre-texto">
                <Reveal as="p" className="lead">
                  Prazer, Hebert Freitas. Sou desenvolvedor Full Stack em Belo
                  Horizonte. Construo aplicações web e mobile, conectando
                  interfaces, APIs e dados para resolver problemas reais.
                </Reveal>
                <Reveal as="p">
                  Atuo na EMIVE desde janeiro de 2022, desenvolvendo interfaces
                  em React e TypeScript, APIs .NET e aplicativos com Flutter —
                  do protótipo à entrega em produção.
                </Reveal>
                <Reveal as="p">
                  Minha experiência também passa por modelagem de dados, SQL
                  Server e dashboards. Tenho formação em Análise e
                  Desenvolvimento de Sistemas pela UNA Belo Horizonte.
                </Reveal>
                <Reveal className="about-links">
                  <a
                    className="botao"
                    href={RESUME_URL}
                    download={RESUME_FILENAME}
                  >
                    <span>Baixar currículo</span>
                    <FiDownload className="seta" />
                  </a>
                  <a
                    className="social-icon"
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub de Hebert"
                  >
                    <FaGithub />
                  </a>
                  <a
                    className="social-icon"
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn de Hebert"
                  >
                    <FaLinkedin />
                  </a>
                </Reveal>
              </div>
            </div>
            <div className="experience-list">
              <Reveal as="p" className="rotulo">
                Minha trajetória
              </Reveal>
              {experiencesData.map((item) => (
                <Reveal className="experience-row" key={item.id}>
                  <span className="rotulo">{item.period}</span>
                  <div>
                    <h3>{item.role}</h3>
                    <p>{item.company}</p>
                  </div>
                  <p>{item.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="secao secao--liso trabalhos" id="trabalhos">
          <div className="envelope">
            <Reveal as="header" className="cabeca-secao">
              <p className="rotulo">Trabalhos</p>
              <p className="cabeca-secao-nota">Seleção de projetos</p>
            </Reveal>
            <Title className="secao-titulo">
              {[{ text: "Trabalhos" }, { text: "entregues.", em: true }]}
            </Title>
            <div className="lista-cases">
              {projectsData.map((project, index) => (
                <Project project={project} index={index} key={project.id} />
              ))}
            </div>
          </div>
        </section>
        <section className="secao secao--textura servicos" id="servicos">
          <div className="envelope">
            <Reveal as="p" className="rotulo">
              Serviços
            </Reveal>
            <Title className="secao-titulo">
              {[
                { text: "O site é a porta de entrada." },
                { text: "A solução cresce com o seu negócio.", em: true },
              ]}
            </Title>
            <ol className="lista-servicos">
              {services.map(([title, description], i) => (
                <Reveal
                  as="li"
                  className="servico"
                  key={title}
                  delay={(i % 3) * 0.08}
                >
                  <h3 className="servico-titulo">{title}</h3>
                  <p className="servico-texto">{description}</p>
                </Reveal>
              ))}
            </ol>
            <div className="skills-block">
              <Reveal as="p" className="rotulo">
                Tecnologias que fazem acontecer
              </Reveal>
              <div className="skills-grid">
                {skillsData.map((category) => (
                  <Reveal key={category.title}>
                    <h3>{category.title}</h3>
                    <div className="skill-items">
                      {category.skills.map((skill) => (
                        <span key={skill.name}>
                          <img src={skill.icon} alt="" loading="lazy" />
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
        <footer className="secao secao--liso rodape" id="contato">
          <div className="envelope">
            <div className="rodape-topo">
              <div className="rodape-chamada">
                <Title className="rodape-titulo">
                  {[{ text: "Tem um projeto?" }]}
                </Title>
                <Reveal as="p" className="rodape-lead">
                  Me conta o que você precisa. Vamos encontrar a melhor forma de
                  transformar sua ideia em uma solução web, mobile ou back-end.
                </Reveal>
              </div>
              <Reveal>
                <a
                  className="fogo"
                  id="fogo"
                  href={whatsapp}
                  target="_blank"
                  rel="noreferrer"
                >
                  <canvas className="fogo-tela" aria-hidden="true" />
                  <span className="fogo-anel" />
                  <span className="fogo-miolo">
                    <span className="fogo-texto">Chamar no WhatsApp</span>
                    <FiArrowRight className="fogo-seta" />
                  </span>
                </a>
              </Reveal>
            </div>
            <Reveal className="rodape-grade">
              <div>
                <p className="rotulo">Contato</p>
                <a
                  className="link-fio"
                  href={whatsapp}
                  target="_blank"
                  rel="noreferrer"
                >
                  (31) 99105-9695
                </a>
              </div>
              <div>
                <p className="rotulo">Onde</p>
                <p>Belo Horizonte – MG, Brasil</p>
              </div>
              <div>
                <p className="rotulo">O que</p>
                <p>Web, mobile e soluções Full Stack</p>
              </div>
              <div>
                <p className="rotulo">Conecte-se</p>
                <div className="footer-social">
                  <a
                    className="link-fio"
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a
                    className="link-fio"
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </Reveal>
            <div className="rodape-fim">
              <Brand />
              <p className="rotulo">
                © {new Date().getFullYear()} Hebert Freitas · Desenvolvedor Full
                Stack
              </p>
              <a className="link-fio back-top" href="#inicio">
                Voltar ao topo ↑
              </a>
            </div>
          </div>
        </footer>
      </main>
      <div className="rosto rosto--voando" ref={portrait} aria-hidden="true">
        <img src="/uploads/hebert-portrait-gray.png" alt="" fetchPriority="high" />
        <span className="rosto-fusao" />
      </div>
    </>
  );
}
