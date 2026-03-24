import { useState } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Chip,
} from '@mui/material'
import type { Task, TaskStatus, TaskPriority } from '../types/task'

type Order = 'asc' | 'desc'
type SortableColumn = keyof Task

type ChipColor = 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'

const STATUS_META: Record<TaskStatus, { label: string; color: ChipColor }> = {
  pending: { label: '未処理', color: 'default' },
  in_review: { label: '審査中', color: 'primary' },
  approved: { label: '承認済み', color: 'success' },
  rejected: { label: '差戻し', color: 'error' },
  on_hold: { label: '保留中', color: 'warning' },
}

const PRIORITY_META: Record<TaskPriority, { label: string; color: ChipColor }> = {
  high: { label: '高', color: 'error' },
  medium: { label: '中', color: 'warning' },
  low: { label: '低', color: 'default' },
}

function sortTasks(tasks: Task[], orderBy: SortableColumn, order: Order): Task[] {
  return [...tasks].sort((a, b) => {
    const av = String(a[orderBy] ?? '')
    const bv = String(b[orderBy] ?? '')
    const cmp = av.localeCompare(bv, 'ja')
    return order === 'asc' ? cmp : -cmp
  })
}

interface Column {
  id: SortableColumn
  label: string
  width?: number | string
}

const COLUMNS: Column[] = [
  { id: 'title', label: 'タスク名' },
  { id: 'type', label: '申請種別', width: 120 },
  { id: 'status', label: 'ステータス', width: 110 },
  { id: 'priority', label: '優先度', width: 80 },
  { id: 'dueDate', label: '期限', width: 110 },
  { id: 'requester', label: '申請者', width: 130 },
]

interface TaskTableProps {
  tasks: Task[]
}

export function TaskTable({ tasks }: TaskTableProps) {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<SortableColumn>('dueDate')

  function handleSort(column: SortableColumn) {
    if (orderBy === column) {
      setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setOrderBy(column)
      setOrder('asc')
    }
  }

  const sorted = sortTasks(tasks, orderBy, order)

  return (
    <Paper
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <TableContainer sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Table stickyHeader size="small" aria-label="タスク一覧">
          <TableHead>
            <TableRow>
              {COLUMNS.map((col) => (
                <TableCell
                  key={col.id}
                  width={col.width}
                  sortDirection={orderBy === col.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === col.id}
                    direction={orderBy === col.id ? order : 'asc'}
                    onClick={() => handleSort(col.id)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((task) => (
              <TableRow
                key={task.id}
                hover
                sx={{ cursor: 'default' }}
              >
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.type}</TableCell>
                <TableCell>
                  <Chip
                    label={STATUS_META[task.status].label}
                    color={STATUS_META[task.status].color}
                    size="small"
                    variant="filled"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={PRIORITY_META[task.priority].label}
                    color={PRIORITY_META[task.priority].color}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>{task.requester}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
