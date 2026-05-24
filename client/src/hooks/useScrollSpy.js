import { useEffect, useState } from 'react'

export function useScrollSpy(sectionIds, options = {}) {
  const { rootMargin = '-20% 0px -60% 0px', threshold = 0 } = options
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null)

  useEffect(() => {
    if (sectionIds.length === 0) return

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin, threshold },
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [sectionIds, rootMargin, threshold])

  return activeId
}
