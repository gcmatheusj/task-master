import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"
import { ProjectDetail } from "@/modules/projects/components/project-detail"

export default async function ProjectDetailPage () {
  const session = await auth()
    
  if (!session || !session.user) {
    redirect('/login')
  }

  return (
    <ProjectDetail />
  )
}