import { Nav, NavItem, NavSectionHeader, tokens } from '@fluentui/react-components'
import type { TaskCategory } from '../types/task'

const NAV_ITEMS: { value: TaskCategory; label: string }[] = [
  { value: 'my-tasks', label: '自分のタスク' },
  { value: 'pending-approval', label: '承認待ち' },
  { value: 'overdue', label: '期限超過' },
]

interface TaskNavProps {
  selectedCategory: TaskCategory
  onCategoryChange: (category: TaskCategory) => void
  taskCounts: Record<TaskCategory, number>
}

export function TaskNav({ selectedCategory, onCategoryChange, taskCounts }: TaskNavProps) {
  return (
    <div
      style={{
        width: 220,
        flexShrink: 0,
        borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
        backgroundColor: tokens.colorNeutralBackground1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Nav
        selectedValue={selectedCategory}
        onNavItemSelect={(_, data) => {
          onCategoryChange(data.value as TaskCategory)
        }}
      >
        <NavSectionHeader>タスク管理</NavSectionHeader>
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.value} value={item.value}>
            <span
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <span>{item.label}</span>
              <span
                style={{
                  fontSize: tokens.fontSizeBase200,
                  color:
                    selectedCategory === item.value
                      ? tokens.colorBrandForeground1
                      : tokens.colorNeutralForeground3,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {taskCounts[item.value]}
              </span>
            </span>
          </NavItem>
        ))}
      </Nav>
    </div>
  )
}
