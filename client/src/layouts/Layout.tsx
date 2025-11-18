import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import PageTransition from "@/components/PageTransition"

interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageTransition>
        <main className="flex-1">{children}</main>
      </PageTransition>
      <Footer />
    </div>
  )
}

export default Layout
