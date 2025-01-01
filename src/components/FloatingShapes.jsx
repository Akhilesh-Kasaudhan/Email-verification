import React from "react";
import { motion } from "motion/react";
const FloatingShapes = ({ color, size, delay, style }) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl `}
      style={style}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: ["0deg", "360deg", "0deg"],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        delay: delay,
      }}
      aria-hidden="true"
    ></motion.div>
  );
};

export default FloatingShapes;
