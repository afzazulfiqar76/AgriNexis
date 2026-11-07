import { useCallback, useState } from 'react'

export function usePasswordVisibility(initialVisible = false) {
  const [visible, setVisible] = useState(initialVisible)

  const toggle = useCallback(() => {
    setVisible((prev) => !prev)
  }, [])

  return { visible, toggle }
}
