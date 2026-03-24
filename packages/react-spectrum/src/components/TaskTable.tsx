import { useState } from 'react'
import {
  TableView,
  TableHeader,
  TableBody,
  Column,
  Row,
  Cell,
  Badge,
} from '@react-spectrum/s2'
import type { Task, TaskPriority, TaskStatus } from '../types/task'

interface SortDescriptor {
  column: string
  direction: 'ascending' | 'descending'
}

const STATUS_LABEL: Record<TaskStatus, string> = {
  pending: '未処理',
  in_review: '審査中',
  approved: '承認済み',
  rejected: '差戻し',
  on_hold: '保留中',
}

const STATUS_VARIANT: Record<TaskStatus, 'neutral' | 'informative' | 'positive' | 'negative' | 'notice'> = {
  pending: 'neutral',
  in_review: 'informative',
  approved: 'positive',
  rejected: 'negative',
  on_hold: 'notice',
}

const PRIORITY_LABEL: Record<TaskPriority, string> = {
  high: '高',
  medium: '中',
  low: '低',
}

const PRIORITY_VARIANT: Record<TaskPriority, 'negative' | 'notice' | 'neutral'> = {
  high: 'negative',
  medium: 'notice',
  low: 'neutral',
}

function sortTasks(tasks: Task[], descriptor: SortDescriptor): Task[] {
  return [...tasks].sort((a, b) => {
    const col = descriptor.column as keyof Task
    const av = a[col] ?? ''
    const bv = b[col] ?? ''
    const cmp = String(av).localeCompare(String(bv), 'ja')
    return descriptor.direction === 'ascending' ? cmp : -cmp
  })
}

interface TaskTableProps {
  tasks: Task[]
}

export function TaskTable({ tasks }: TaskTableProps) {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'dueDate',
    direction: 'ascending',
  })

  const sorted = sortTasks(tasks, sortDescriptor)

  return (
    <TableView
      aria-label="タスク一覧"
      sortDescriptor={sortDescriptor}
      onSortChange={(descriptor) => {
        if (descriptor.column) {
          setSortDescriptor({
            column: String(descriptor.column),
            direction: descriptor.direction ?? 'ascending',
          })
        }
      }}
      selectionMode="none"
    >
      <TableHeader>
        <Column id="title" isRowHeader allowsSorting minWidth={200}>
          タスク名
        </Column>
        <Column id="type" allowsSorting width={120}>
          申請種別
        </Column>
        <Column id="status" allowsSorting width={110}>
          ステータス
        </Column>
        <Column id="priority" allowsSorting width={80}>
          優先度
        </Column>
        <Column id="dueDate" allowsSorting width={110}>
          期限
        </Column>
        <Column id="requester" allowsSorting width={130}>
          申請者
        </Column>
      </TableHeader>
      <TableBody items={sorted}>
        {(task) => (
          <Row id={task.id}>
            <Cell>{task.title}</Cell>
            <Cell>{task.type}</Cell>
            <Cell>
              <Badge variant={STATUS_VARIANT[task.status]}>
                {STATUS_LABEL[task.status]}
              </Badge>
            </Cell>
            <Cell>
              <Badge variant={PRIORITY_VARIANT[task.priority]}>
                {PRIORITY_LABEL[task.priority]}
              </Badge>
            </Cell>
            <Cell>{task.dueDate}</Cell>
            <Cell>{task.requester}</Cell>
          </Row>
        )}
      </TableBody>
    </TableView>
  )
}
