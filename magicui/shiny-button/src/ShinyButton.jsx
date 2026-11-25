'use client';

import { forwardRef, useState } from 'react';
import { motion } from 'motion/react';

import './ShinyButton.css';

const animationProps = {
  initial: { '--x': '100%', scale: 0.8 },
  animate: { '--x': '-100%', scale: 1 },
  whileTap: { scale: 0.9 },
  transition: {
    repeat: Infinity,
    repeatType: 'loop',
    repeatDelay: 1,
    type: 'spring',
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: 'spring',
      stiffness: 200,
      damping: 5,
      mass: 0.5
    }
  }
};

export const ShinyButton = forwardRef(function ShinyButton(
  { children, className = '', onPointerDown, ...props },
  ref
) {
  const [ripple, setRipple] = useState(0);

  return (
    <motion.button
      ref={ref}
      className={['shiny-button', className].filter(Boolean).join(' ')}
      {...animationProps}
      {...props}
      onPointerDown={event => {
        setRipple(value => value + 1);
        onPointerDown?.(event);
      }}
    >
      <span className="shiny-button__label">{children}</span>
      <span className="shiny-button__border" aria-hidden="true" />
      {ripple > 0 ? <span key={ripple} className="shiny-button__ripple" aria-hidden="true" /> : null}
    </motion.button>
  );
});

export default ShinyButton;
