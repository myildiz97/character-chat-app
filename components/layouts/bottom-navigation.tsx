"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Bot } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUserContext } from '../context/user-context'
import { logout } from '@/lib/actions/auth-actions'

const navItems = [
  { href: "/chat", label: "Chats", icon: Home },
  { href: "/characters", label: "Characters", icon: Bot },
]

export function BottomNavigation() {
  const { user } = useUserContext();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/70 backdrop-blur-xl">
      <div className="grid grid-cols-3 items-center py-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.includes(href);
          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-col items-center justify-center gap-1 px-4"
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className={`relative z-10 flex flex-col gap-1 items-center ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="size-5" />
                <span className="text-xs">{label}</span>
              </motion.div>
            </Link>
          )
        })}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="relative flex flex-col items-center justify-center gap-1 px-4 focus:outline-none cursor-pointer"
            >
              <Avatar className="w-6 h-6">
                <AvatarImage src={user?.user_metadata?.avatar_url || ""} alt={user?.user_metadata?.name || "User"} />
                <AvatarFallback>{user?.user_metadata?.name?.charAt(0)?.toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground hidden md:block">{user?.user_metadata?.name || "You"}</span>
              <span className="text-xs text-muted-foreground block md:hidden">You</span>
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="center" className="w-28">
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
