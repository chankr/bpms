import { useState, useMemo } from 'react'
import { Box, AppBar, Toolbar, Typography } from '@mui/material'
import { NavigationDrawer, DRAWER_WIDTH } from './NavigationDrawer'
import { FilterStrip } from './FilterStrip'
import { TaskTable } from './TaskTable'
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

export function AppShell() {
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory>('my-tasks')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  const taskCounts = useMemo(
    () => ({
      'my-tasks': mockTasks.length,
      'pending-approval': mockTasks.filter((t) => t.status === 'in_review').length,
      overdue: mockTasks.filter((t) => t.dueDate < TODAY && t.status !== 'approved').length,
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
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <NavigationDrawer
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        taskCounts={taskCounts}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
        }}
      >
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Toolbar variant="dense">
            <Typography variant="h6" component="h1">
              {CATEGORY_LABEL[selectedCategory]}
            </Typography>
          </Toolbar>
        </AppBar>

        <FilterStrip
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
        />

        <Box sx={{ flexGrow: 1, overflow: 'hidden', p: 2, bgcolor: 'background.default' }}>
          <TaskTable tasks={filteredTasks} />
        </Box>
      </Box>
    </Box>
  )
}
