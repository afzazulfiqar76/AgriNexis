import { BarChart3 } from 'lucide-react-native'
import { EmptyState } from '../EmptyState'

/** Compact analytics empty state — replaces oversized “Chart visualization” blocks. */
export function ChartPlaceholder({
  title = 'Analytics coming soon',
  description = 'Charts and trends will appear here once reporting data is available.',
}) {
  return (
    <EmptyState
      icon={BarChart3}
      title={title}
      description={description}
      compact
    />
  )
}
