import { Toolbar, ToolbarDivider, SearchBox, Select, Text, tokens } from '@fluentui/react-components'

interface TaskToolbarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  priorityFilter: string
  onPriorityChange: (value: string) => void
}

export function TaskToolbar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
}: TaskToolbarProps) {
  return (
    <div
      style={{
        borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
        padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalXL}`,
      }}
    >
      <Toolbar aria-label="タスクフィルター">
        <SearchBox
          placeholder="タスク検索"
          value={searchQuery}
          onChange={(_, data) => onSearchChange(data.value)}
          style={{ minWidth: 240 }}
        />
        <ToolbarDivider />
        <div
          style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}
        >
          <label htmlFor="status-filter">
            <Text size={200} weight="semibold">
              ステータス
            </Text>
          </label>
          <Select
            id="status-filter"
            value={statusFilter}
            onChange={(_, data) => onStatusChange(data.value)}
          >
            <option value="all">すべて</option>
            <option value="pending">未処理</option>
            <option value="in_review">審査中</option>
            <option value="approved">承認済み</option>
            <option value="rejected">差戻し</option>
            <option value="on_hold">保留中</option>
          </Select>
        </div>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}
        >
          <label htmlFor="priority-filter">
            <Text size={200} weight="semibold">
              優先度
            </Text>
          </label>
          <Select
            id="priority-filter"
            value={priorityFilter}
            onChange={(_, data) => onPriorityChange(data.value)}
          >
            <option value="all">すべて</option>
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </Select>
        </div>
      </Toolbar>
    </div>
  )
}
