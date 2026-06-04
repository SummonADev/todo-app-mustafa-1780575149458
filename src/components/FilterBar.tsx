import React from 'react'
import type { FilterType } from '@/types/todo'

interface Props {
  filter: FilterType
  onFilterChange: (f: FilterType) => void
  activeCount: number
  completedCount: number
  onClearCompleted: () => void
  onToggleAll: () => void
  totalCount: number
}

export default function FilterBar({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
  onClearCompleted,
  onToggleAll,
  totalCount,
}: Props) {
  const filters: FilterType[] = ['all', 'active', 'completed']

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-2">
        {totalCount > 0 && (
          <button
            onClick={onToggleAll}
            className="text-xs text-gray-500 hover:text-violet-600 font-medium transition-colors"
          >
            {activeCount === 0 ? 'Uncheck all' : 'Check all'}
          </button>
        )}
        <span className="text-xs text-gray-400">
          {activeCount} item{activeCount !== 1 ? 's' : ''} left
        </span>
      </div>

      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all duration-150 ${
              filter === f
                ? 'bg-white text-violet-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div>
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="text-xs text-gray-400 hover:text-red-500 font-medium transition-colors"
          >
            Clear completed ({completedCount})
          </button>
        )}
      </div>
    </div>
  )
}
