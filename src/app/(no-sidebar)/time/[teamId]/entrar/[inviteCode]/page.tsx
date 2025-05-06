import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { getTeam } from "@/modules/teams/queries"
import { JoinTeamForm } from "@/modules/teams/components/join-team-form"

interface JoinTeamPageProps {
  params: {
    teamId: string
  }
}

export default async function JoinTeamPage ({ params }: JoinTeamPageProps) {
  const session = await auth()
  
  if (!session || !session.user) {
    redirect('/login')
  }

  const { teamId } = params

  const team = await getTeam(teamId)

  if (!team) {
    return <p>Time não encontrado</p>
  }

  return (
    <div className="w-full max-w-xl">
      <JoinTeamForm name={team.name} />
    </div>
  )
}