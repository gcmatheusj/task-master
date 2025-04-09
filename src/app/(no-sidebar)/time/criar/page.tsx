import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { CreateTeamForm } from "@/modules/teams/components/create-team-form";

export default async function CreateTeamPage () {
  const session = await auth()

  if (!session || !session.user) {
    redirect('/login')
  }

  return (
    <div className="w-full lg:max-w-xl">
      <CreateTeamForm />
    </div>
  )
}