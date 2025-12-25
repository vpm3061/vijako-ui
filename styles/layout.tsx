import './globals.css'
import { NavVisibilityProvider } from '@/components/shared/NavVisibilityProvider'
import TopBar from '@/components/shared/TopBar'
import MiddleNav from '@/components/shared/MiddleNav'
import BottomNav from '@/components/shared/BottomNav'
import SideDrawer from '@/components/shared/SideDrawer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <NavVisibilityProvider>

          <TopBar />
          <MiddleNav />
          <SideDrawer />

          <div className="pt-[120px] pb-20">
            {children}
          </div>

          <BottomNav />
        </NavVisibilityProvider>
      </body>
    </html>
  )
}
