import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Chip,
} from '@mui/material'
import type { TaskCategory } from '../types/task'

const DRAWER_WIDTH = 240

const NAV_ITEMS: { id: TaskCategory; label: string }[] = [
  { id: 'my-tasks', label: '自分のタスク' },
  { id: 'pending-approval', label: '承認待ち' },
  { id: 'overdue', label: '期限超過' },
]

interface NavigationDrawerProps {
  selectedCategory: TaskCategory
  onCategoryChange: (category: TaskCategory) => void
  taskCounts: Record<TaskCategory, number>
}

export function NavigationDrawer({
  selectedCategory,
  onCategoryChange,
  taskCounts,
}: NavigationDrawerProps) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar>
        <Typography variant="subtitle1" fontWeight={700} noWrap>
          BPMS タスク
        </Typography>
      </Toolbar>
      <Divider />
      <List disablePadding>
        {NAV_ITEMS.map((item) => (
          <ListItemButton
            key={item.id}
            selected={selectedCategory === item.id}
            onClick={() => onCategoryChange(item.id)}
            sx={{ py: 1.5, px: 2 }}
          >
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ variant: 'body2' }}
            />
            <Chip
              label={taskCounts[item.id]}
              size="small"
              color={selectedCategory === item.id ? 'primary' : 'default'}
              variant={selectedCategory === item.id ? 'filled' : 'outlined'}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}

export { DRAWER_WIDTH }
