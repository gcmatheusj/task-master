import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { SigninCard } from "@/modules/auth/components/signin-card";

export default async function LoginPage () {
  const session = await auth()
  
  if (session) {
    redirect("/");
  }

  return (
    <SigninCard />
  )
}