import { SearchField, Picker, PickerItem } from '@react-spectrum/s2'
import type { Key } from 'react'

interface FilterBarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: Key | null) => void
  priorityFilter: string
  onPriorityChange: (value: Key | null) => void
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
}: FilterBarProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '16px',
        padding: '16px 0',
        flexWrap: 'wrap',
      }}
    >
      <SearchField
        label="タスク検索"
        value={searchQuery}
        onChange={onSearchChange}
      />
      <Picker
        label="ステータス"
        selectedKey={statusFilter}
        onSelectionChange={onStatusChange}
      >
        <PickerItem id="all">すべて</PickerItem>
        <PickerItem id="pending">未処理</PickerItem>
        <PickerItem id="in_review">審査中</PickerItem>
        <PickerItem id="approved">承認済み</PickerItem>
        <PickerItem id="rejected">差戻し</PickerItem>
        <PickerItem id="on_hold">保留中</PickerItem>
      </Picker>
      <Picker
        label="優先度"
        selectedKey={priorityFilter}
        onSelectionChange={onPriorityChange}
      >
        <PickerItem id="all">すべて</PickerItem>
        <PickerItem id="high">高</PickerItem>
        <PickerItem id="medium">中</PickerItem>
        <PickerItem id="low">低</PickerItem>
      </Picker>
    </div>
  )
}
