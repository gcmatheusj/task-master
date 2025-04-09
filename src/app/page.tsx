import { auth } from "@/lib/auth";
import { getTeams } from "@/modules/teams/queries";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()

  if (!session || !session.user) {
    redirect("/login");
  }

  const teams = await getTeams(session.user.id as string);

  if (teams.length === 0) {
    redirect("/time/criar");
  } else {
    redirect(`/time/${teams[0].id}`);
  }
}
