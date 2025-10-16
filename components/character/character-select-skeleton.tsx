"use client"

import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import CarouselSkeleton from '../shared/carousel-skeleton'

export default function CharacterSelectSkeleton() {
  const placeholders = Array.from({ length: 5 })

  return (
    <>
      <CarouselSkeleton className='sm:hidden p-2' />
      <div className="hidden sm:flex sm:relative sm:flex-col sm:items-center sm:justify-center sm:overflow-hidden sm:w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2 sm:p-6 sm:gap-4"
        >
          {placeholders.map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative overflow-hidden rounded-3xl bg-secondary backdrop-blur-2xl p-6 w-full flex flex-col items-center gap-3"
            >
              <Skeleton className="w-20 h-20 rounded-full bg-background" />
              <Skeleton className="w-24 h-5 rounded-md bg-background" />
              <Skeleton className="w-20 h-4 rounded-md bg-background" />
              <div className="flex flex-col items-center gap-2 mt-2">
                <Skeleton className="w-60 h-4 rounded-md bg-background" />
                <Skeleton className="w-36 h-4 rounded-md bg-background" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  )
}
