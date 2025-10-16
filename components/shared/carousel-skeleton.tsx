"use client"

import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
interface CarouselSkeletonProps {
  className?: string;
}

export default function CarouselSkeleton({ className }: CarouselSkeletonProps) {
  const items = Array.from({ length: 5 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("w-full", className)}
    >
      <div className="flex gap-4 overflow-hidden w-full h-[200px]">
        {items.map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="w-full flex gap-3 bg-secondary rounded-2xl p-4"
          >
            <Skeleton className="aspect-square w-[50%] rounded-2xl bg-background" />
            <div className="flex flex-col justify-start w-full gap-2">
              <Skeleton className="h-4 w-24 rounded bg-background" />
              <Skeleton className="h-3 w-32 rounded bg-background" />
              <Skeleton className="h-3 w-28 rounded bg-background" />
              <Skeleton className="h-3 w-32 rounded bg-background" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
