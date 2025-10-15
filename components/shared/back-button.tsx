import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface IBackButtonProps {
  href: string;
  label: string;
}

export function BackButton({ href, label }: IBackButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link href={href} className="flex items-center gap-2">
        <ArrowLeft className="size-5 text-muted-foreground hover:text-foreground transition-colors" />
        <span className="text-sm text-muted-foreground hidden md:block">{label}</span>
      </Link>
    </motion.div>
  )
}
