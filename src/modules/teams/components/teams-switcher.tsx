'use client'

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useGetTeams } from "../hooks/use-get-teams";
import { useEffect, useState } from "react";
import { useTeamId } from "../hooks/use-team-id";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { TeamAvatar } from "./team-avatar";
import { useRouter } from "next/navigation";
import { useCreateTeamModal } from "../hooks/use-create-team-modal";

interface Team {
  name: string;
  id: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  inviteCode: string;
}

export function TeamsSwitcher () {
  const [activeTeam, setActiveTeam] = useState<Team | null>(null)
  const { data: teams } = useGetTeams()
  const teamId = useTeamId()
  const router = useRouter()
  const { open } = useCreateTeamModal()

  useEffect(() => {
    const team = teams?.data.find(team => team.id === teamId)

    if (team) {
      setActiveTeam(team)
    } else if (teams?.data.length) {
      setActiveTeam(teams.data[0])
    }
  }, [teamId, teams])

  const onSelectTeam = (teamId: string) => {
    router.push(`/time/${teamId}`)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="rounded-none">
            <SidebarMenuButton
              size='lg'
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {activeTeam ? (
                <>
                  <TeamAvatar name={activeTeam.name} image={activeTeam.image ?? undefined} />

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{activeTeam.name}</span>
                  </div>

                  <ChevronsUpDown className="ml-auto" />
                </>
              ) : (
                <Skeleton className='w-full h-10' />
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent 
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-none"
            align="start"
            side='bottom'
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">Times</DropdownMenuLabel>

            {teams?.data.map((team) => (
              <DropdownMenuItem className="gap-2 p-2 hover:rounded-none" key={team.id} onClick={() => onSelectTeam(team.id)}>
                <TeamAvatar name={team.name} image={team.image ?? undefined} />
                {team.name}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuItem className="gap-2 p-2 cursor-pointer hover:rounded-none" onClick={open}>
              <div className="flex size-6 items-center justify-center rounded-none border bg-background">
                <Plus className="size-4" />
              </div>

              <span className="font-medium text-muted-foreground">Criar Time</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}