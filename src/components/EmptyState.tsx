import React from 'react'
import type { FilterType } from '@/types/todo'

interface Props {
  filter: FilterType
  hasSearch: boolean
}

export default function EmptyState({ filter, hasSearch }: Props) {
  let message = ''
  let emoji = ''

  if (hasSearch) {
    emoji = '🔍'
    message = 'No todos match your search.'
  } else if (filter === 'completed') {
    emoji = '🎯'
    message = 'No completed todos yet. Keep going!'
  } else if (filter === 'active') {
    emoji = '🎉'
    message = 'All done! Nothing left to do.'
  } else {
    emoji = '📝'
    message = 'No todos yet. Add one above!'
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <span className="text-4xl mb-3">{emoji}</span>
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  )
}
