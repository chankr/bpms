import { useState, useMemo } from 'react'
import { CounterBadge, Title2, tokens } from '@fluentui/react-components'
import { TaskNav } from './TaskNav'
import { TaskToolbar } from './TaskToolbar'
import { TaskDataGrid } from './TaskDataGrid'
import { mockTasks } from '../data/mockTasks'
import type { Task, TaskCategory } from '../types/task'

const TODAY = '2026-03-24'

const CATEGORY_LABEL: Record<TaskCategory, string> = {
  'my-tasks': '自分のタスク',
  'pending-approval': '承認待ち',
  overdue: '期限超過',
}

function filterByCategory(tasks: Task[], category: TaskCategory): Task[] {
  switch (category) {
    case 'my-tasks':
      return tasks
    case 'pending-approval':
      return tasks.filter((t) => t.status === 'in_review')
    case 'overdue':
      return tasks.filter((t) => t.dueDate < TODAY && t.status !== 'approved')
  }
}

export function TaskManagementApp() {
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory>('my-tasks')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  const taskCounts = useMemo(
    () => ({
      'my-tasks': mockTasks.length,
      'pending-approval': mockTasks.filter((t) => t.status === 'in_review').length,
      overdue: mockTasks.filter(
        (t) => t.dueDate < TODAY && t.status !== 'approved',
      ).length,
    }),
    [],
  )

  const filteredTasks = useMemo(() => {
    let tasks = filterByCategory(mockTasks, selectedCategory)

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      tasks = tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.requester.toLowerCase().includes(q) ||
          t.type.toLowerCase().includes(q),
      )
    }

    if (statusFilter !== 'all') {
      tasks = tasks.filter((t) => t.status === statusFilter)
    }

    if (priorityFilter !== 'all') {
      tasks = tasks.filter((t) => t.priority === priorityFilter)
    }

    return tasks
  }, [selectedCategory, searchQuery, statusFilter, priorityFilter])

  function handleCategoryChange(category: TaskCategory) {
    setSelectedCategory(category)
    setSearchQuery('')
    setStatusFilter('all')
    setPriorityFilter('all')
  }

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: tokens.colorNeutralBackground2,
      }}
    >
      <TaskNav
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        taskCounts={taskCounts}
      />

      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: tokens.colorNeutralBackground1,
        }}
      >
        {/* page header — wayfinding: current category + count */}
        <div
          style={{
            padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalXL}`,
            borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
            display: 'flex',
            alignItems: 'center',
            gap: tokens.spacingHorizontalS,
          }}
        >
          <Title2 as="h1" style={{ margin: 0 }}>
            {CATEGORY_LABEL[selectedCategory]}
          </Title2>
          <CounterBadge count={filteredTasks.length} color="brand" size="medium" />
        </div>

        {/* toolbar — action grouping: search + filters */}
        <TaskToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
        />

        {/* data grid */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
          }}
        >
          <TaskDataGrid tasks={filteredTasks} />
        </div>
      </main>
    </div>
  )
}
