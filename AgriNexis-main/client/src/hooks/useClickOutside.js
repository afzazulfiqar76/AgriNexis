import { useEffect } from 'react'

export function useClickOutside(ref, handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return

    function handlePointerDown(event) {
      const el = ref.current
      if (!el || el.contains(event.target)) return
      handler(event)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [ref, handler, enabled])
}
