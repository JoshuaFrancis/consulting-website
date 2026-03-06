"use client"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function FigmaCursorIcon() {
  return (
    <svg fill="none" height="18" viewBox="0 0 17 18" width="17">
      <path
        d="M15.5036 3.11002L12.5357 15.4055C12.2666 16.5204 10.7637 16.7146 10.22 15.7049L7.4763 10.6094L2.00376 8.65488C0.915938 8.26638 0.891983 6.73663 1.96711 6.31426L13.8314 1.65328C14.7729 1.28341 15.741 2.12672 15.5036 3.11002ZM7.56678 10.6417L7.56645 10.6416C7.56656 10.6416 7.56667 10.6416 7.56678 10.6417L7.65087 10.4062L7.56678 10.6417Z"
        fill="var(--sky-500)"
        stroke="var(--sky-400)"
        strokeWidth="1.5"
      />
    </svg>
  )
}

interface AnimatedCursorProps {
  className?: string
  text: string
}

export function AnimatedCursor({ className, text }: AnimatedCursorProps) {
  return (
    <motion.div
      initial={{ x: 0, y: 0 }}
      animate={{
        x: ["0px", "10px", "10px", "40px", "40px", "-20px", "-20px", "60px", "30px", "30px", "0px"],
        y: ["0px", "-5px", "-5px", "25px", "25px", "10px", "10px", "50px", "55px", "55px", "0px"],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.08, 0.14, 0.24, 0.30, 0.42, 0.48, 0.62, 0.72, 0.80, 1],
      }}
      className="flex items-start gap-1"
    >
      <FigmaCursorIcon />
      <div
        className={cn(
          "w-fit rounded-full py-0.5 px-2 bg-sky-600 border border-sky-400 text-white text-[8px] whitespace-nowrap",
          className
        )}
      >
        {text}
      </div>
    </motion.div>
  )
}
