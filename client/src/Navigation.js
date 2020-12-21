import * as React from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from './MenuItem';

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    display: 'block',
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1, delay: 0.5 },
    display: 'none',
  },
};

export const Navigation = ({ setLanguage }) => (
  <motion.ul variants={variants} onClick={(e) => e.stopPropagation()}>
    {itemIds.map((text, i) => (
      <MenuItem i={i} key={i} item={text} setLanguage={setLanguage} />
    ))}
  </motion.ul>
);

const itemIds = [
  { displayText: 'Javascript', language: 'javascript' },
  { displayText: 'C#', language: 'csharp' },
  { displayText: 'Kotlin', language: 'kotlin' },
  { displayText: 'Scala', language: 'scala' },
  { displayText: 'Python', language: 'python' },
  { displayText: 'Rust', language: 'rust' },
];
