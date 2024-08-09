import React, { useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import AppContext from './AppContext';

const Output = ({ out, isMinimized, onMinimize }) => {
  const constraintsRef = useContext(AppContext);
  const [isMaximized, setIsMaximized] = useState(false);
  const [zIndex, setZIndex] = useState(1); // State to manage zIndex
  const containerRef = useRef(null);

  useEffect(() => {
    // Handle minimization animation with GSAP
    gsap.to(containerRef.current, {
      duration: 0.8,
      x: isMinimized ? '200%' : 0,
      y: isMinimized ? '-15%' : 0,
      scaleX: isMinimized ? 0.3 : 1,
      scaleY: isMinimized ? 0.3 : 1,
      opacity: isMinimized ? 0 : 1,
    });
  }, [isMinimized]);

  useEffect(() => {
    // Handle maximization animation with GSAP
    gsap.to(containerRef.current, {
      duration: 0.8,
      width: isMaximized ? '100vw' : '40vw',
      height: isMaximized ? '100vh' : '16rem', // 16rem = 64px (h-64) default height
      ease: 'easeOut',
    });
  }, [isMaximized]);

  const toggleMinimize = () => {
    onMinimize();
  };

  const toggleMaximize = () => {
    setIsMaximized((prev) => !prev);
  };

  const handleClick = () => {
    // Bring this component to the front by setting its zIndex higher
    setZIndex(10);
  };

  const handleBlur = () => {
    setZIndex(1);
  };

  return (
    <motion.div
      ref={containerRef}
      drag
      dragConstraints={constraintsRef}
      dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
      onMouseDown={handleClick} // Update zIndex when component is clicked
      onBlur={handleBlur} // Reset zIndex if needed when focus is lost
      className={`mb-7 rounded-lg shadow-lg bg-slate-200`} // Basic styles without width/height
      style={{ position: 'relative', zIndex }} // Apply dynamic zIndex
    >
      <div className="ps-2 bg-zinc-700 flex justify-between items-center rounded-t-lg">
        <span>Output</span>
        <div className="flex">
          <button
            onClick={toggleMinimize}
            className="bg-zinc-700 text-white px-4 hover:bg-slate-600 text-2xl"
          >
            <sup>_</sup>
          </button>
          <button
            onClick={toggleMaximize}
            className="bg-zinc-700 text-white hover:bg-slate-600 px-4 rounded-e-lg rounded-b-none"
          >
            {isMaximized ? '◱' : '▢'}
          </button>
        </div>
      </div>
      <div className="block h-full z-0 rounded-b-lg text-black">
        {out()}
      </div>
    </motion.div>
  );
};

export default Output;
