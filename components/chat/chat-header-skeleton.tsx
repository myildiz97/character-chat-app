"use client"

import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

export const RealtimeChatHeaderSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 w-screen h-20 z-10 backdrop-blur-xl border-b border-border flex p-4"
    >
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between gap-4">
        <Skeleton className="h-5 w-5 rounded-md" />
        <div className="flex items-center gap-4">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="w-24 h-4 rounded" />
            <Skeleton className="w-16 h-3 rounded" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
