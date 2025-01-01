import React from "react";
import { motion } from "motion/react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      {/* simple loading spinner */}
      <motion.div
        className="w-16 h-16 border-4 border-t-4 border-t-green-500 boder-green-200 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      ></motion.div>
    </div>
  );
};

export default LoadingSpinner;