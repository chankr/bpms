import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatDividerModule } from '@angular/material/divider'
import { Sort } from '@angular/material/sort'
import { TaskNavComponent } from './task-nav/task-nav.component'
import { TaskFilterBarComponent } from './task-filter-bar/task-filter-bar.component'
import { TaskTableComponent } from './task-table/task-table.component'
import { TaskService } from './task.service'
import type { Task, TaskCategory } from './task.model'

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

function applySortComparator(tasks: Task[], sort: Sort): Task[] {
  if (!sort.active || sort.direction === '') return tasks
  return [...tasks].sort((a, b) => {
    const dir = sort.direction === 'asc' ? 1 : -1
    const col = sort.active as keyof Task
    const av = a[col] as string
    const bv = b[col] as string
    return av.localeCompare(bv, 'ja') * dir
  })
}

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatSidenavModule,
    MatDividerModule,
    TaskNavComponent,
    TaskFilterBarComponent,
    TaskTableComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly taskService = inject(TaskService)
  private readonly allTasks = this.taskService.getTasks()

  readonly selectedCategory = signal<TaskCategory>('my-tasks')
  readonly searchQuery = signal('')
  readonly statusFilter = signal('all')
  readonly priorityFilter = signal('all')
  readonly sortState = signal<Sort>({ active: '', direction: '' })

  readonly taskCounts = computed(() => ({
    'my-tasks': this.allTasks.length,
    'pending-approval': this.allTasks.filter((t) => t.status === 'in_review').length,
    overdue: this.allTasks.filter((t) => t.dueDate < TODAY && t.status !== 'approved').length,
  }))

  readonly displayTasks = computed(() => {
    let tasks = filterByCategory(this.allTasks, this.selectedCategory())

    const q = this.searchQuery().toLowerCase()
    if (q) {
      tasks = tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.requester.toLowerCase().includes(q) ||
          t.type.toLowerCase().includes(q),
      )
    }

    if (this.statusFilter() !== 'all') {
      tasks = tasks.filter((t) => t.status === this.statusFilter())
    }

    if (this.priorityFilter() !== 'all') {
      tasks = tasks.filter((t) => t.priority === this.priorityFilter())
    }

    return applySortComparator(tasks, this.sortState())
  })

  onCategoryChange(category: TaskCategory): void {
    this.selectedCategory.set(category)
    this.searchQuery.set('')
    this.statusFilter.set('all')
    this.priorityFilter.set('all')
    this.sortState.set({ active: '', direction: '' })
  }
}
