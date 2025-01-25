import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navigation() {
  return (
    <nav className="border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold text-primary">
              AA Rebooking
            </Link>
            <div className="hidden md:flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost">Flight Options</Button>
              </Link>
              <Link href="/entertainment">
                <Button variant="ghost">Entertainment</Button>
              </Link>
              <Link href="/help-desks">
                <Button variant="ghost">Help Desks</Button>
              </Link>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

