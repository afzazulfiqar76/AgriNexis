import { useEffect, useMemo, useState } from 'react'
import { FAQ_CATEGORY_MAP, FAQ_ITEMS } from '@/constants/faqContent'

function matchesSearch(item, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true

  const categoryLabel = FAQ_CATEGORY_MAP[item.category] ?? ''
  const haystack = `${item.question} ${item.answer} ${categoryLabel}`.toLowerCase()
  return haystack.includes(q)
}

export function useFaqPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [openFaqId, setOpenFaqId] = useState(null)

  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const categoryMatch =
        activeCategory === 'all' || item.category === activeCategory
      return categoryMatch && matchesSearch(item, searchQuery)
    })
  }, [activeCategory, searchQuery])

  useEffect(() => {
    if (openFaqId && !filteredFaqs.some((item) => item.id === openFaqId)) {
      setOpenFaqId(null)
    }
  }, [filteredFaqs, openFaqId])

  function setCategory(categoryId) {
    setActiveCategory(categoryId)
    setOpenFaqId(null)
  }

  function toggleFaq(id) {
    setOpenFaqId((current) => (current === id ? null : id))
  }

  return {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setCategory,
    openFaqId,
    toggleFaq,
    filteredFaqs,
  }
}
