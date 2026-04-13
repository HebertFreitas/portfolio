import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./layout/Layout.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { ContentPage } from "./pages/ContentPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/quem-sou"
            element={<ContentPage pageKey="quem-sou" />}
          />
          <Route
            path="/experiencias"
            element={<ContentPage pageKey="experiencias" />}
          />
          <Route
            path="/conhecimento"
            element={<ContentPage pageKey="conhecimento" />}
          />
          <Route path="/contato" element={<ContentPage pageKey="contato" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
