import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"

import App from "./App.jsx"
import { ColorModeProvider } from "./theme/color-mode.jsx"

import "./index.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>
        <App />
      </ColorModeProvider>
    </ChakraProvider>
  </StrictMode>,
)
