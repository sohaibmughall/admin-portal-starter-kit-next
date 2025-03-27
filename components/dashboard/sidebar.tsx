"use client"

import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  Package,
  LineChart,
  Tags,
  MessageSquare,
  Star
} from "lucide-react"

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    label: 'Products',
    icon: Package,
    href: '/products',
  },
  {
    label: 'Orders',
    icon: ShoppingBag,
    href: '/orders',
  },
  {
    label: 'Customers',
    icon: Users,
    href: '/customers',
  },
  {
    label: 'Analytics',
    icon: LineChart,
    href: '/analytics',
  },
  {
    label: 'Categories',
    icon: Tags,
    href: '/categories',
  },
  {
    label: 'Reviews',
    icon: Star,
    href: '/reviews',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
]

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const onNavigate = (href: string) => {
    router.push(href)
  }

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-card text-card-foreground">
      <div className="px-3 py-2">
        <div onClick={() => onNavigate('/dashboard')} className="flex items-center pl-3 mb-14 cursor-pointer">
          <h1 className="text-2xl font-bold">Admin Portal</h1>
        </div>
        <div className="space-y-1">
          {routes.map((route) => (
            <div
              key={route.href}
              onClick={() => onNavigate(route.href)}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-primary/10 rounded-lg transition",
                pathname === route.href ? "bg-primary/10 text-primary" : "text-muted-foreground"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", pathname === route.href ? "text-primary" : "text-muted-foreground")} />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}