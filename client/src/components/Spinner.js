import React from 'react'
import { motion } from 'framer-motion'

const Spinner = () => (
  <motion.div
    className="spinner"
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    }}
  >
    <img className="spinner-image" alt="loading..." src="./spinner.gif"></img>
  </motion.div>
)

export default Spinner
