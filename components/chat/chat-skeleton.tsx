"use client"

import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

export const ChatSkeleton = () => {
  const bubbles = [
    { side: "left", width: "60%" },
    { side: "right", width: "40%" },
    { side: "left", width: "70%" },
    { side: "right", width: "45%" },
    { side: "left", width: "60%" },
    { side: "right", width: "40%" },
    { side: "left", width: "70%" },
    { side: "right", width: "45%" },
  ]

  return (
    <div className="flex flex-col justify-between h-full w-full max-w-3xl mx-auto bg-background text-foreground antialiased overflow-hidden mt-20 max-h-[calc(100vh-80px)]">
      <div className="flex flex-col gap-6 px-4 pb-4 overflow-y-hidden">
        {bubbles.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className={`flex ${b.side === "right" ? "justify-end" : "justify-start"}`}
          >
            <Skeleton
              className={`rounded-2xl h-5 ${b.side === "right" ? "rounded-br-sm" : "rounded-bl-sm"}`}
              style={{ width: b.width, minHeight: "1.25rem" }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.6 }}
        className="flex items-center gap-3 p-4 border-t border-border bg-background/80 backdrop-blur-lg"
      >
        <Skeleton className="flex-1 h-11 rounded-full" />
        <Skeleton className="w-11 h-11 rounded-full" />
      </motion.div>
    </div>
  )
}
