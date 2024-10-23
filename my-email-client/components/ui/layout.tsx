import Header from './header'
import Sidebar from './sidebar'
import Footer from './footer'
import ComposeEmail from './compose-email'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden relative">
          {children}
        </main>
      </div>
      <div className="relative">
        <ComposeEmail />
        <Footer />
      </div>
    </div>
  )
}