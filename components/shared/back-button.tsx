import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { CustomText } from "../ui/custom/custom-text"
import { cn } from "@/lib/utils"

interface IBackButtonProps {
  href: string;
  label: string;
  className?: string;
}

export function BackButton({ href, label, className }: IBackButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link href={href} className={cn("flex items-center gap-2", className)}>
        <ArrowLeft className="size-5 text-muted-foreground hover:text-foreground transition-colors" />
        <CustomText variant='span' className='text-sm hidden md:block'>{label}</CustomText>
      </Link>
    </motion.div>
  )
}
