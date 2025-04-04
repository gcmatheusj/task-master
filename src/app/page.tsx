import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()

  if (!session || !session.user) {
    redirect("/login");
  }
  
  return (
    <div>
      <h1>Hello NextJS + Shadcn-UI</h1>
      <Button>Fui Feito com Shadcn</Button>
    </div>
  );
}
