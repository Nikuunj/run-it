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
    if (isMinimized) {
      gsap.to(containerRef.current, {
        duration: 0.8,
        x: '200%',
        y: '-15%',
        scaleX: 0.3,
        scaleY: 0.3,
        opacity: 0,
      });
    } else {
      gsap.to(containerRef.current, {
        duration: 0.8,
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
      });
    }
  }, [isMinimized]);

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
      className={`mb-7 ${isMaximized ? 'w-screen h-screen' : 'w-[40vw] h-64 md:h-96'} rounded-lg shadow-lg bg-slate-200`}
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
      <div className="block h-full z-0 rounded-b-lg">
        {out()}
      </div>
    </motion.div>
  );
};

export default Output;
