import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

interface UseGetMembersParams {
  teamId: string
}

export function useGetMembers({ teamId }: UseGetMembersParams) {
  return useQuery({
    queryKey: ["members", teamId],
    queryFn: async () => {
      const response = await client.api.members.$get({ query: { teamId}})

      if (!response.ok) {
        throw new Error('Error ao buscar os membros')
      }

      return await response.json()
    }
  })
}