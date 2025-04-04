import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth()

  console.log({ session })
  return (
    <div>
      <h1>Hello NextJS + Shadcn-UI</h1>
      <Button>Fui Feito com Shadcn</Button>
    </div>
  );
}
