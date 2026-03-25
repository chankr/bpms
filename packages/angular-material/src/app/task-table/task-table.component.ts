import { ChangeDetectionStrategy, Component, input, output } from '@angular/core'
import { MatTableModule } from '@angular/material/table'
import { MatSortModule, Sort } from '@angular/material/sort'
import { MatChipsModule } from '@angular/material/chips'
import type { Task, TaskStatus, TaskPriority } from '../task.model'

interface StatusMeta {
  label: string
  cssClass: string
}

interface PriorityMeta {
  label: string
  cssClass: string
}

const STATUS_META: Record<TaskStatus, StatusMeta> = {
  pending: { label: '未処理', cssClass: 'chip-pending' },
  in_review: { label: '審査中', cssClass: 'chip-in-review' },
  approved: { label: '承認済み', cssClass: 'chip-approved' },
  rejected: { label: '差戻し', cssClass: 'chip-rejected' },
  on_hold: { label: '保留中', cssClass: 'chip-on-hold' },
}

const PRIORITY_META: Record<TaskPriority, PriorityMeta> = {
  high: { label: '高', cssClass: 'chip-high' },
  medium: { label: '中', cssClass: 'chip-medium' },
  low: { label: '低', cssClass: 'chip-low' },
}

@Component({
  selector: 'app-task-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTableModule, MatSortModule, MatChipsModule],
  template: `
    <div class="table-wrapper">
      <table mat-table [dataSource]="tasks()" matSort (matSortChange)="sortChange.emit($event)" class="mat-elevation-z1">
        <ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>タスク名</th>
          <td mat-cell *matCellDef="let task">{{ task.title }}</td>
        </ng-container>

        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>申請種別</th>
          <td mat-cell *matCellDef="let task">{{ task.type }}</td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>ステータス</th>
          <td mat-cell *matCellDef="let task">
            <mat-chip-set>
              <mat-chip [class]="statusMeta(task.status).cssClass" disableRipple>
                {{ statusMeta(task.status).label }}
              </mat-chip>
            </mat-chip-set>
          </td>
        </ng-container>

        <ng-container matColumnDef="priority">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>優先度</th>
          <td mat-cell *matCellDef="let task">
            <mat-chip-set>
              <mat-chip [class]="priorityMeta(task.priority).cssClass" disableRipple>
                {{ priorityMeta(task.priority).label }}
              </mat-chip>
            </mat-chip-set>
          </td>
        </ng-container>

        <ng-container matColumnDef="dueDate">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>期限</th>
          <td mat-cell *matCellDef="let task">{{ task.dueDate }}</td>
        </ng-container>

        <ng-container matColumnDef="requester">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>申請者</th>
          <td mat-cell *matCellDef="let task">{{ task.requester }}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>

        <tr class="mat-row" *matNoDataRow>
          <td class="mat-cell no-data-cell" [attr.colspan]="displayedColumns.length">
            該当するタスクがありません
          </td>
        </tr>
      </table>
    </div>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }
    .table-wrapper {
      height: 100%;
      overflow: auto;
    }
    table {
      width: 100%;
    }
    .no-data-cell {
      padding: 24px;
      text-align: center;
      color: var(--mat-sys-on-surface-variant);
    }
    .chip-pending { background-color: var(--mat-sys-surface-variant) !important; }
    .chip-in-review { background-color: #e3f2fd !important; color: #1565c0 !important; }
    .chip-approved { background-color: #e8f5e9 !important; color: #2e7d32 !important; }
    .chip-rejected { background-color: #fce4ec !important; color: #c62828 !important; }
    .chip-on-hold { background-color: #fff8e1 !important; color: #f57f17 !important; }
    .chip-high { background-color: #fce4ec !important; color: #c62828 !important; }
    .chip-medium { background-color: #fff3e0 !important; color: #e65100 !important; }
    .chip-low { background-color: var(--mat-sys-surface-variant) !important; }
  `,
})
export class TaskTableComponent {
  readonly tasks = input.required<Task[]>()
  readonly sortChange = output<Sort>()

  readonly displayedColumns = ['title', 'type', 'status', 'priority', 'dueDate', 'requester']

  statusMeta(status: TaskStatus): StatusMeta {
    return STATUS_META[status]
  }

  priorityMeta(priority: TaskPriority): PriorityMeta {
    return PRIORITY_META[priority]
  }
}
