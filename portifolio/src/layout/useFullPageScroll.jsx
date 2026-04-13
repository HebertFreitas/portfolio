import { useEffect, useRef } from "react"

export function useFullPageScroll(sectionIds, enabled = true) {
  const lockRef = useRef(false)
  const lastRef = useRef(0)

  useEffect(() => {
    if (!enabled) return

    const mq = window.matchMedia("(min-width: 1024px)")
    if (!mq.matches) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const getSections = () =>
      sectionIds.map((id) => document.getElementById(id)).filter(Boolean)

    const getCurrentIndex = (sections) => {
      // pega a seção mais próxima do topo
      const y = window.scrollY
      let best = 0
      let bestDist = Infinity
      sections.forEach((el, i) => {
        const dist = Math.abs(el.offsetTop - y)
        if (dist < bestDist) {
          bestDist = dist
          best = i
        }
      })
      return best
    }

    const onWheel = (e) => {
      // não interferir em inputs/textarea/select
      const t = e.target
      const tag = t?.tagName?.toLowerCase()
      if (tag === "input" || tag === "textarea" || tag === "select") return

      const now = performance.now()
      const dy = e.deltaY

      // ignora micro scroll
      if (Math.abs(dy) < 10) return

      // trava para não disparar múltiplos
      if (lockRef.current) {
        e.preventDefault()
        return
      }

      // anti “rajada” do trackpad
      if (now - lastRef.current < 250) {
        e.preventDefault()
        return
      }
      lastRef.current = now

      const sections = getSections()
      if (sections.length === 0) return

      const current = getCurrentIndex(sections)
      const next = dy > 0 ? current + 1 : current - 1
      const target = sections[next]
      if (!target) return

      e.preventDefault()
      lockRef.current = true

      target.scrollIntoView({ behavior: "smooth", block: "start" })

      // libera depois da animação
      window.setTimeout(() => {
        lockRef.current = false
      }, 900)
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    return () => window.removeEventListener("wheel", onWheel)
  }, [sectionIds, enabled])
}