export type TaskStatus = 'pending' | 'in_review' | 'approved' | 'rejected' | 'on_hold'
export type TaskPriority = 'high' | 'medium' | 'low'
export type TaskCategory = 'my-tasks' | 'pending-approval' | 'overdue'

export interface Task {
  id: string
  title: string
  type: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
  requester: string
}
