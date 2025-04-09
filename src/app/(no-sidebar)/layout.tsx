import { Logo } from "@/components/logo"
import Link from "next/link"

interface NoSidebarLayoutProps {
  children: React.ReactNode
}

export default function NoSidebarLayout ({ children }: NoSidebarLayoutProps) {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-center items-center">
          <Link href='/'>
            <Logo />
          </Link>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  )
}