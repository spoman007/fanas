import React from 'react'
import { motion } from 'framer-motion'

const Spinner = () => (
  <div className="spinner">
    <motion.img
      className="spinner-image"
      alt="loading..."
      src="./apple-icon-72x72.png"
      animate={{ rotate: 360 }}
      transition={{ loop: Infinity, ease: 'linear', duration: 1 }}
    ></motion.img>
  </div>
)

export default Spinner
