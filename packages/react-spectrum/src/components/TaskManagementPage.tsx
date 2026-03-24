import { useState, useMemo } from 'react'
import { Tabs, TabList, Tab, TabPanel } from '@react-spectrum/s2'
import type { Key } from 'react'
import { FilterBar } from './FilterBar'
import { TaskTable } from './TaskTable'
import { mockTasks } from '../data/mockTasks'
import type { Task, TaskCategory } from '../types/task'

const TODAY = '2026-03-24'

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

export function TaskManagementPage() {
  const [selectedTab, setSelectedTab] = useState<TaskCategory>('my-tasks')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  const filteredTasks = useMemo(() => {
    let tasks = filterByCategory(mockTasks, selectedTab)

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
  }, [selectedTab, searchQuery, statusFilter, priorityFilter])

  function handleTabChange(key: Key) {
    setSelectedTab(key as TaskCategory)
    setSearchQuery('')
    setStatusFilter('all')
    setPriorityFilter('all')
  }

  const tabContent = (
    <>
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={(v) => setStatusFilter(v != null ? String(v) : 'all')}
        priorityFilter={priorityFilter}
        onPriorityChange={(v) => setPriorityFilter(v != null ? String(v) : 'all')}
      />
      <TaskTable tasks={filteredTasks} />
    </>
  )

  return (
    <div style={{ padding: '24px' }}>
      <h1
        style={{
          margin: '0 0 24px',
          fontSize: '24px',
          fontWeight: 600,
        }}
      >
        タスク管理
      </h1>

      <Tabs aria-label="タスクカテゴリ" selectedKey={selectedTab} onSelectionChange={handleTabChange}>
        <TabList aria-label="タスクカテゴリ">
          <Tab id="my-tasks">自分のタスク</Tab>
          <Tab id="pending-approval">承認待ち</Tab>
          <Tab id="overdue">期限超過</Tab>
        </TabList>

        <TabPanel id="my-tasks">{tabContent}</TabPanel>
        <TabPanel id="pending-approval">{tabContent}</TabPanel>
        <TabPanel id="overdue">{tabContent}</TabPanel>
      </Tabs>
    </div>
  )
}
