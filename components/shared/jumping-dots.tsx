"use client"

import { motion, Variants } from "motion/react"

function LoadingThreeDotsJumping() {
    const dotVariants: Variants = {
        jump: {
            y: -4,
            transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
            },
        },
    }

    return (
        <motion.div
            animate="jump"
            transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
            className="container"
        >
            <motion.div className="dot" variants={dotVariants} />
            <motion.div className="dot" variants={dotVariants} />
            <motion.div className="dot" variants={dotVariants} />
            <StyleSheet />
        </motion.div>
    )
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
    return (
        <style>
            {`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 6px;
            }

            .dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: #e5e5e5;
                will-change: transform;
            }
            `}
        </style>
    )
}

export default LoadingThreeDotsJumping
