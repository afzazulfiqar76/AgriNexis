import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'agrinexis.admin.sidebarCollapsed'

export function useAdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, String(isCollapsed))
    } catch {
      // ignore
    }
  }, [isCollapsed])

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev)
  }, [])

  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev)
  }, [])

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false)
  }, [])

  return {
    isCollapsed,
    isMobileOpen,
    toggleCollapse,
    toggleMobile,
    closeMobile,
  }
}
