import { client } from "@/lib/rpc";
import { TaskStatus } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

interface UseGetTasksParams {
  teamId: string
  projectId?: string
  assigneeId?: string
  status?: TaskStatus
  dueDate?: string
  search?: string
}

export function useGetTasks(query: UseGetTasksParams) {
  return useQuery({
    queryKey: [
      "tasks", 
      query.teamId,
      query.projectId,
      query.assigneeId,
      query.status,
      query.search,
      query.dueDate,
    ],
    queryFn: async () => {
      const response = await client.api.tasks.$get({ query })

      if (!response.ok) {
        throw new Error('Error ao buscar as tarefas')
      }

      return await response.json()
    }
  })
}