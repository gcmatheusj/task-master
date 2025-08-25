'use client'

import { Separator } from "@/components/ui/separator"
import { TasksBreadcrumbs } from "./tasks-breadcrumbs"
import { useGetTask } from "../hooks/use-get-task"
import { useTaskId } from "../hooks/use-project-id"
import { Task } from "../types"
import { TaskOverview } from "./task-overview"
import { TaskDescription } from "./task-description"

export function TaskDetail () {
  const taskId = useTaskId()
  const { data: task, isLoading } = useGetTask({ taskId })

  if (isLoading) return <span>Carregando...</span>

  if (!task) return <span>Nenhuma tarefa encontrada</span>

  return (
    <div>
      <TasksBreadcrumbs project={task.data.project} task={task.data as Task} />

      <Separator className="my-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TaskOverview task={task.data as Task} />
        <TaskDescription task={task.data as Task} />
      </div>
    </div>
  )
}