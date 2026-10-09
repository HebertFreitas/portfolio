# Hebert Freitas — Portfólio

Portfólio em React e Vite, repaginado a partir da referência visual https://www.nicolasdev.app.br/ e adaptado às informações de Hebert Freitas.

## Executar

```sh
npm install
npm run dev
```

```sh
npm run build
npm run preview
```

## Experiência

- Abertura em Three.js com nome em 3D: o H com fones entra pela direita, salta sobre as letras e se encaixa no espaço vazio no início. Som habilitado por padrão, reproduzido somente ao clicar em “Quem é Hebert Dev?”. O controle de som apenas ativa ou desativa a preferência. “Pular abertura” e Escape permanecem silenciosos. Transição azul. “Pular abertura” e Escape permitem entrar diretamente.
- Entrada do botão com cometa azul, rastro, partículas, desenho do contorno e revelação gradual do texto.
- Tipografia Archivo, base preta, destaques azuis e fundo procedural animado.
- Rolagem suave nativa e retrato que passa do início à moldura da seção Sobre.
- Entrada de títulos por palavra, projetos expansíveis e detalhes com links para demonstração e código.
- Serviços, stack técnica, trajetória, currículo e canais de contato existentes.
- Menu móvel, navegação por teclado e respeito a `prefers-reduced-motion`.

## Conteúdo e manutenção

`src/App.jsx` contém a composição e os textos das seções. Os projetos, habilidades e experiências estão em `src/data/`. Fotos, imagens dos projetos e currículo estão em `public/`.

A abertura está em `src/components/Opening.jsx`; rolagem, retrato, cursor, fundo e partículas estão em `src/lib/usePortfolioEffects.js`. O layout está em `src/index.css`.

A abertura foi recriada para a identidade do Hebert; a fonte 3D é Poppins Bold, com os mesmos parâmetros de extrusão, iluminação e enquadramento da referência. A sequência inclui queda das letras, entrada com três saltos, compressão de uma letra como mola e cambalhota até o espaço reservado para o H. Os efeitos sonoros são próprios. Nenhuma foto ou informação pessoal do autor da referência foi incorporada.

## Testar a abertura

```sh
node --test tests/*.test.js
```

Os testes verificam as métricas da fonte, a geometria das letras e a animação real por GSAP, incluindo a cambalhota e a posição final do H.
