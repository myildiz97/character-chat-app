"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from '@/lib/actions/auth-actions'
import { AvatarContainer } from '../shared/avatar-container'
import { NAV_ITEMS } from '@/lib/constants/navbar'
import { CustomText } from '../ui/custom/custom-text'

export function BottomNavigation() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/70 backdrop-blur-xl">
      <div className="grid grid-cols-3 items-center py-3 max-w-sm mx-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.includes(href);
          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-col items-center justify-center gap-1 px-4 mx-auto min-w-11 min-h-11"
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className={`relative z-10 flex flex-col gap-1 items-center w-fit ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-6 h-6" />
                <CustomText variant='span' className='text-sm w-fit'>{label}</CustomText>
              </motion.div>
            </Link>
          )
        })}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="relative flex flex-col items-center justify-center gap-1 px-4 focus:outline-none cursor-pointer min-w-11 min-h-11 w-fit mx-auto"
            >
              <AvatarContainer variant='user' label={{ show: true, direction: 'column', type: 'short' }} size='xs' />
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="center" className="w-28">
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer min-w-11 min-h-11">
              Logout <LogOut className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
