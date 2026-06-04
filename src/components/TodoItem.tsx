import React, { useState, useRef, useEffect } from 'react'
import type { Todo, Priority } from '@/types/todo'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
  onChangePriority: (id: string, priority: Priority) => void
}

const priorityConfig: Record<Priority, { label: string; dot: string; badge: string }> = {
  low: { label: 'Low', dot: 'bg-green-400', badge: 'bg-green-100 text-green-700' },
  medium: { label: 'Medium', dot: 'bg-yellow-400', badge: 'bg-yellow-100 text-yellow-700' },
  high: { label: 'High', dot: 'bg-red-400', badge: 'bg-red-100 text-red-700' },
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit, onChangePriority }: Props) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
    }
  }, [editing])

  const handleEditSubmit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText)
    } else {
      setEditText(todo.text)
    }
    setEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleEditSubmit()
    if (e.key === 'Escape') {
      setEditText(todo.text)
      setEditing(false)
    }
  }

  const cfg = priorityConfig[todo.priority]

  return (
    <div
      className={`group flex items-center gap-3 p-4 rounded-xl border bg-white shadow-sm transition-all duration-200 ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-150 ${
          todo.completed
            ? 'bg-violet-500 border-violet-500'
            : 'border-gray-300 hover:border-violet-400'
        }`}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Text */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            ref={inputRef}
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 border-b-2 border-violet-400 focus:outline-none text-gray-800 text-sm bg-transparent"
          />
        ) : (
          <span
            onDoubleClick={() => !todo.completed && setEditing(true)}
            className={`block text-sm text-gray-800 truncate cursor-default select-none ${
              todo.completed ? 'line-through text-gray-400' : ''
            }`}
            title={todo.text}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Priority badge */}
      <div className="flex-shrink-0">
        <select
          value={todo.priority}
          onChange={e => onChangePriority(todo.id, e.target.value as Priority)}
          className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-violet-400 ${cfg.badge}`}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        {!todo.completed && (
          <button
            onClick={() => setEditing(true)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-violet-600 transition-colors"
            aria-label="Edit todo"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Delete todo"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}
