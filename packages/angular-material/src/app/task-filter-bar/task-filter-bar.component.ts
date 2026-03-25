import { ChangeDetectionStrategy, Component, input, output } from '@angular/core'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-task-filter-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule],
  template: `
    <mat-toolbar>
      <mat-form-field appearance="outline" subscriptSizing="dynamic" class="search-field">
        <mat-icon matPrefix>search</mat-icon>
        <input
          matInput
          type="search"
          placeholder="タスク検索"
          [value]="searchQuery()"
          (input)="searchQueryChange.emit($any($event.target).value)"
          aria-label="タスク検索"
        />
      </mat-form-field>

      <mat-form-field appearance="outline" subscriptSizing="dynamic" class="filter-field">
        <mat-label>ステータス</mat-label>
        <mat-select
          [value]="statusFilter()"
          (selectionChange)="statusFilterChange.emit($event.value)"
        >
          <mat-option value="all">すべて</mat-option>
          <mat-option value="pending">未処理</mat-option>
          <mat-option value="in_review">審査中</mat-option>
          <mat-option value="approved">承認済み</mat-option>
          <mat-option value="rejected">差戻し</mat-option>
          <mat-option value="on_hold">保留中</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" subscriptSizing="dynamic" class="filter-field">
        <mat-label>優先度</mat-label>
        <mat-select
          [value]="priorityFilter()"
          (selectionChange)="priorityFilterChange.emit($event.value)"
        >
          <mat-option value="all">すべて</mat-option>
          <mat-option value="high">高</mat-option>
          <mat-option value="medium">中</mat-option>
          <mat-option value="low">低</mat-option>
        </mat-select>
      </mat-form-field>
    </mat-toolbar>
  `,
  styles: `
    mat-toolbar {
      gap: 12px;
      flex-wrap: wrap;
      height: auto;
      padding: 8px 16px;
    }
    .search-field {
      width: 240px;
    }
    .filter-field {
      width: 160px;
    }
  `,
})
export class TaskFilterBarComponent {
  readonly searchQuery = input.required<string>()
  readonly statusFilter = input.required<string>()
  readonly priorityFilter = input.required<string>()

  readonly searchQueryChange = output<string>()
  readonly statusFilterChange = output<string>()
  readonly priorityFilterChange = output<string>()
}
