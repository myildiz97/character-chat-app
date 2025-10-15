"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { CustomButton } from "../ui/custom/custom-button"

const BOTTOM_BUTTON_THRESHOLD = 20;

interface ChatBottomButtonProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export function ChatBottomButton({ scrollContainerRef }: ChatBottomButtonProps) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      setShowButton(distanceFromBottom > BOTTOM_BUTTON_THRESHOLD);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef]);

  const scrollToBottom = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 22,
          }}
          className="absolute bottom-24 right-5 z-20"
        >
          <motion.div
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 18,
            }}
          >
            <CustomButton
              onClick={scrollToBottom}
              className="rounded-full shadow-lg hover:shadow-xl transition-all w-10 h-10"
            >
              <ArrowDown className="size-4" />
            </CustomButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
