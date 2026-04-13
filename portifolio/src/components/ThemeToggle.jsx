import { Button } from "@chakra-ui/react"
import { FiMoon, FiSun } from "react-icons/fi"

import { useColorMode } from "../theme/color-mode.jsx"

export function ThemeToggle() {
  const { mode, toggle } = useColorMode()
  const Icon = mode === "dark" ? FiSun : FiMoon

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label="Alternar tema"
      onClick={toggle}
      px="2"
      minW="0"
    >
      <Icon />
    </Button>
  )
}

