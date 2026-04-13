import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./layout/Layout.jsx";
import { HomePage } from "./pages/HomePage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}