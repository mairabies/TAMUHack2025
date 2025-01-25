import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import "@/styles/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className={cn("min-h-screen", "bg-background", "font-sans antialiased")}>
            <Navigation />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'