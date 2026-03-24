import {
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridBody,
  DataGridRow,
  DataGridCell,
  createTableColumn,
  Badge,
  type TableColumnDefinition,
} from '@fluentui/react-components'
import type { Task, TaskStatus, TaskPriority } from '../types/task'

type BadgeColor = 'brand' | 'danger' | 'important' | 'informative' | 'severe' | 'subtle' | 'success' | 'warning'

const STATUS_META: Record<TaskStatus, { label: string; color: BadgeColor }> = {
  pending: { label: '未処理', color: 'subtle' },
  in_review: { label: '審査中', color: 'informative' },
  approved: { label: '承認済み', color: 'success' },
  rejected: { label: '差戻し', color: 'danger' },
  on_hold: { label: '保留中', color: 'warning' },
}

const PRIORITY_META: Record<TaskPriority, { label: string; color: BadgeColor }> = {
  high: { label: '高', color: 'danger' },
  medium: { label: '中', color: 'severe' },
  low: { label: '低', color: 'subtle' },
}

const columns: TableColumnDefinition<Task>[] = [
  createTableColumn<Task>({
    columnId: 'title',
    compare: (a, b) => a.title.localeCompare(b.title, 'ja'),
    renderHeaderCell: () => 'タスク名',
    renderCell: (task) => task.title,
  }),
  createTableColumn<Task>({
    columnId: 'type',
    compare: (a, b) => a.type.localeCompare(b.type, 'ja'),
    renderHeaderCell: () => '申請種別',
    renderCell: (task) => task.type,
  }),
  createTableColumn<Task>({
    columnId: 'status',
    compare: (a, b) => a.status.localeCompare(b.status),
    renderHeaderCell: () => 'ステータス',
    renderCell: (task) => (
      <Badge color={STATUS_META[task.status].color} appearance="tint">
        {STATUS_META[task.status].label}
      </Badge>
    ),
  }),
  createTableColumn<Task>({
    columnId: 'priority',
    compare: (a, b) => a.priority.localeCompare(b.priority),
    renderHeaderCell: () => '優先度',
    renderCell: (task) => (
      <Badge color={PRIORITY_META[task.priority].color} appearance="outline">
        {PRIORITY_META[task.priority].label}
      </Badge>
    ),
  }),
  createTableColumn<Task>({
    columnId: 'dueDate',
    compare: (a, b) => a.dueDate.localeCompare(b.dueDate),
    renderHeaderCell: () => '期限',
    renderCell: (task) => task.dueDate,
  }),
  createTableColumn<Task>({
    columnId: 'requester',
    compare: (a, b) => a.requester.localeCompare(b.requester, 'ja'),
    renderHeaderCell: () => '申請者',
    renderCell: (task) => task.requester,
  }),
]

interface TaskDataGridProps {
  tasks: Task[]
}

export function TaskDataGrid({ tasks }: TaskDataGridProps) {
  return (
    <DataGrid
      items={tasks}
      columns={columns}
      sortable
      getRowId={(task: Task) => task.id}
      aria-label="タスク一覧"
    >
      <DataGridHeader>
        <DataGridRow>
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Task>>
        {({ item, rowId }) => (
          <DataGridRow<Task> key={rowId}>
            {({ renderCell }) => (
              <DataGridCell>{renderCell(item)}</DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  )
}
