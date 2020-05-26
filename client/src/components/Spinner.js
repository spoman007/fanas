import React from 'react'
import { motion } from 'framer-motion'

const Spinner = () => (
  <motion.div className="spinner" initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  }}>
    <motion.img
      className="spinner-image"
      alt="loading..."
      src="./apple-icon-72x72.png"
      animate={{ rotate: 360 }}
      transition={{ loop: Infinity, ease: 'linear', duration: 1 }}
    ></motion.img>
  </motion.div>
)

export default Spinner
