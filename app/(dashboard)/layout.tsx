"use client"

import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Provider } from 'react-redux'
import { store } from '@/lib/store/store'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <div className="h-full relative">
        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
          <Sidebar />
        </div>
        <main className="md:pl-72">
          <Header />
          {children}
        </main>
      </div>
    </Provider>
  )
}