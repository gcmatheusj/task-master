import { TeamNavigation } from "@/modules/teams/components/team-navigation";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "./ui/sidebar";
import { TeamsSwitcher } from "@/modules/teams/components/teams-switcher";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <TeamsSwitcher />
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