import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'

interface FilterStripProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  priorityFilter: string
  onPriorityChange: (value: string) => void
}

export function FilterStrip({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
}: FilterStripProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: 2,
        py: 1.5,
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        flexShrink: 0,
      }}
    >
      <TextField
        label="タスク検索"
        size="small"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ minWidth: 240 }}
      />
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel id="status-select-label">ステータス</InputLabel>
        <Select
          labelId="status-select-label"
          value={statusFilter}
          label="ステータス"
          onChange={(e: SelectChangeEvent) => onStatusChange(e.target.value)}
        >
          <MenuItem value="all">すべて</MenuItem>
          <MenuItem value="pending">未処理</MenuItem>
          <MenuItem value="in_review">審査中</MenuItem>
          <MenuItem value="approved">承認済み</MenuItem>
          <MenuItem value="rejected">差戻し</MenuItem>
          <MenuItem value="on_hold">保留中</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="priority-select-label">優先度</InputLabel>
        <Select
          labelId="priority-select-label"
          value={priorityFilter}
          label="優先度"
          onChange={(e: SelectChangeEvent) => onPriorityChange(e.target.value)}
        >
          <MenuItem value="all">すべて</MenuItem>
          <MenuItem value="high">高</MenuItem>
          <MenuItem value="medium">中</MenuItem>
          <MenuItem value="low">低</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
