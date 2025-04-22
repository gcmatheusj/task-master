import { TeamNavigation } from "@/modules/teams/components/team-navigation";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "./ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <span>Task Master</span>
      </SidebarHeader>

      <SidebarContent>
        <TeamNavigation />
      </SidebarContent>

      <SidebarFooter>
        <span>User</span>
      </SidebarFooter>
    </Sidebar>
  )
}