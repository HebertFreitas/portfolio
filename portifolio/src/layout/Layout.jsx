import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"

import { Footer } from "./Footer.jsx"

export function Layout() {
  return (
    <Box minH="100svh" bg={{ base: "bg", _dark: "#050505" }} color="fg" display="flex" flexDir="column">
      <Box as="main" flex="1">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

