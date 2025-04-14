import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Create a wrapper component to provide correct context for framer-motion
export const MotionDiv = ({ children, ...props }) => (
  <AnimatePresence>
    <motion.div {...props}>
      {children}
    </motion.div>
  </AnimatePresence>
);

// Export other motion components as needed
export const MotionSection = ({ children, ...props }) => (
  <AnimatePresence>
    <motion.section {...props}>
      {children}
    </motion.section>
  </AnimatePresence>
);

export const MotionSpan = ({ children, ...props }) => (
  <AnimatePresence>
    <motion.span {...props}>
      {children}
    </motion.span>
  </AnimatePresence>
);

export default MotionDiv; 