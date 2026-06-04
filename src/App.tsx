import React from 'react'
import { useTodos } from '@/hooks/useTodos'
import AddTodoForm from '@/components/AddTodoForm'
import TodoItem from '@/components/TodoItem'
import FilterBar from '@/components/FilterBar'
import SearchBar from '@/components/SearchBar'
import EmptyState from '@/components/EmptyState'

export default function App() {
  const {
    todos,
    allTodos,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    changePriority,
    clearCompleted,
    toggleAll,
    activeCount,
    completedCount,
  } = useTodos()

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            ✅ My Todos
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Stay organized, stay productive.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6">
          {/* Add form */}
          <AddTodoForm onAdd={addTodo} />

          {/* Search */}
          {allTodos.length > 0 && (
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          )}

          {/* Filter bar */}
          {allTodos.length > 0 && (
            <FilterBar
              filter={filter}
              onFilterChange={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
              onClearCompleted={clearCompleted}
              onToggleAll={toggleAll}
              totalCount={allTodos.length}
            />
          )}

          {/* Todo list */}
          {todos.length === 0 ? (
            <EmptyState filter={filter} hasSearch={searchQuery.length > 0} />
          ) : (
            <div className="flex flex-col gap-2">
              {todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                  onChangePriority={changePriority}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Double-click a todo to edit • Saved automatically to localStorage
        </p>
      </div>
    </div>
  )
}
