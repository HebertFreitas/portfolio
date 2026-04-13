import { FaCalendarAlt } from "react-icons/fa";

import "./style.css";

export function VerticalTimeline() {
  const items = [
    {
      date: "Atual",
      title: "Desenvolvedor FullStack",
      subtitle: "EMIVE Patrulha 24 HRS",
      body:
        "Automação de processos com API's REST em .NET e integração com banco de dados. Desenvolvimento de interfaces modernas com React, responsivas e com foco em performance e experiência do usuário. Desenvolvimento de aplicativos mobile multiplataforma com Flutter, com UI consistente, boa usabilidade e responsividade para todas as plataformas e tipos de dispositivos.",
    },
    {
      date: "2022 - 2024",
      title: "Seu Cargo",
      subtitle: "Sua Empresa",
      body: "Descreva rapidamente o que você fez, tecnologias e resultados.",
    },
    {
      date: "2020 - 2022",
      title: "Seu Cargo",
      subtitle: "Sua Empresa",
      body: "Descreva rapidamente o que você fez, tecnologias e resultados.",
    },
    {
      date: "2018 - 2020",
      title: "Seu Cargo",
      subtitle: "Sua Empresa",
      body: "Descreva rapidamente o que você fez, tecnologias e resultados.",
    },
  ];

  return (
    <div className="timeline" aria-label="Linha do tempo">
      {items.map((it, idx) => {
        const side = idx % 2 === 0 ? "left" : "right";
        const containerClass =
          side === "left" ? "container left-container" : "container right-container";
        const arrowClass =
          side === "left" ? "left-container-arrow" : "right-container-arrow";
        return (
          <div
            key={`${it.title}-${it.date}-${idx}`}
            className={containerClass}
          >
            <FaCalendarAlt className="calendar-icon" />

            <div className="text-box">
              <h2>{it.title}</h2>
              <small>{it.date}</small>
              <p>{it.body}</p>
              <span className={arrowClass} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
