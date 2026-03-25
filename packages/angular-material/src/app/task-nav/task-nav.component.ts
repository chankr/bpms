import { ChangeDetectionStrategy, Component, input, output } from '@angular/core'
import { MatListModule } from '@angular/material/list'
import { MatBadgeModule } from '@angular/material/badge'
import type { TaskCategory } from '../task.model'

export interface NavItem {
  value: TaskCategory
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { value: 'my-tasks', label: '自分のタスク' },
  { value: 'pending-approval', label: '承認待ち' },
  { value: 'overdue', label: '期限超過' },
]

@Component({
  selector: 'app-task-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatListModule, MatBadgeModule],
  template: `
    <mat-nav-list>
      <h3 matSubheader>タスク管理</h3>
      @for (item of navItems; track item.value) {
        <mat-list-item
          [activated]="selectedCategory() === item.value"
          (click)="categoryChange.emit(item.value)"
        >
          <span matListItemTitle>{{ item.label }}</span>
          <span
            matListItemMeta
            [matBadge]="taskCounts()[item.value]"
            matBadgeSize="small"
            matBadgeColor="primary"
            matBadgeOverlap="false"
          ></span>
        </mat-list-item>
      }
    </mat-nav-list>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }
    mat-nav-list {
      padding-top: 8px;
    }
  `,
})
export class TaskNavComponent {
  readonly selectedCategory = input.required<TaskCategory>()
  readonly taskCounts = input.required<Record<TaskCategory, number>>()
  readonly categoryChange = output<TaskCategory>()

  readonly navItems = NAV_ITEMS
}
