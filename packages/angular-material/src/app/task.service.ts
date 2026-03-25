import { Injectable } from '@angular/core'
import type { Task } from './task.model'
import { MOCK_TASKS } from './mock-tasks'

@Injectable({ providedIn: 'root' })
export class TaskService {
  getTasks(): Task[] {
    return MOCK_TASKS
  }
}
