import { HelpDeskList } from "@/components/help-desk-list"

export default function HelpDesksPage() {
  return (
    <div className="min-h-screen gradient-bg">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Nearby Help Desks</h1>
        <HelpDeskList />
      </main>
    </div>
  )
}

