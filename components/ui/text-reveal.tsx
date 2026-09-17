"use client"

import {
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from "react"
import {
  motion,
  MotionValue,
  useInView,
  useScroll,
  useTransform,
} from "motion/react"

import { cn } from "@/lib/utils"

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string
  /**
   * "scroll" — classic magicui scroll reveal (sticky 200vh section).
   * "load" — in-place word-by-word reveal, runs when the element first enters
   * the viewport (use for hero headlines so the main message appears on load).
   */
  revealOn?: "scroll" | "load"
  /** Applied to each revealed word span. */
  wordClassName?: string
  /** Applied to the wrapping text span (use to override the font size). */
  textClassName?: string
}

export const TextReveal: FC<TextRevealProps> = ({
  children,
  revealOn = "scroll",
  className,
  wordClassName,
  textClassName,
}) => {
  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string")
  }

  if (revealOn === "load") {
    return (
      <LoadReveal
        words={children.split(" ")}
        className={className}
        wordClassName={wordClassName}
        textClassName={textClassName}
      />
    )
  }

  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
  })
  const words = children.split(" ")

  return (
    <div ref={sectionRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div
        className={
          "sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-4 py-20"
        }
      >
        <span
          className={
            "flex flex-wrap p-5 text-2xl font-bold text-black/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl dark:text-white/20"
          }
        >
          {words.map((word, i) => {
            const start = i / words.length
            const end = start + 1 / words.length
            return (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
                wordClassName={wordClassName}
              >
                {word}
              </Word>
            )
          })}
        </span>
      </div>
    </div>
  )
}

interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
  wordClassName?: string
}

const Word: FC<WordProps> = ({ children, progress, range, wordClassName }) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-1.5">
      <span className="absolute opacity-30">{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={cn("text-black dark:text-white", wordClassName)}
      >
        {children}
      </motion.span>
    </span>
  )
}

interface LoadRevealProps {
  words: string[]
  className?: string
  wordClassName?: string
  textClassName?: string
}

/** In-place word reveal that plays as soon as the element enters the viewport. */
const LoadReveal: FC<LoadRevealProps> = ({
  words,
  className,
  wordClassName,
  textClassName,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const inView = useInView(sectionRef, { once: true })

  return (
    <motion.div
      ref={sectionRef}
      className={cn("relative z-0", className)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <span className={cn("flex flex-wrap", textClassName)}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 8, filter: "blur(6px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  delay: 0.1 + i * 0.05,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            className={cn("mx-1 text-black dark:text-white", wordClassName)}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </motion.div>
  )
}