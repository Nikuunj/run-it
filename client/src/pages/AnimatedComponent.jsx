import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);


const AnimatedComponent = () => {
  const containerRef = useRef(null);
  const elementRef = useRef(null);
  const [isMinimized, setIsMinimized] = useState(true);

  const handleToggle = () => {
    if (isMinimized) {
      gsap.to(elementRef.current, { 
        duration: 0.5,
        x: '150%', 
        scaleY:1,
        scaleX:1,
        y: '150%', 
        opacity: 1,
        
    
      });
    } else {
      gsap.to(elementRef.current, { 
        duration: 0.5,
        x: 0, 
        scaleY:0.3,
        scaleX:0.4,
        y: 0,
        opacity: 0
      });
    }
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div 
        ref={containerRef} 
        className="relative w-64 h-64 bg-gray-200 border border-gray-400 rounded-md flex justify-center items-center"
      >
        <div 
          ref={elementRef}
          className="absolute w-32 h-32 bg-blue-500 rounded-md opacity-0"
        />
        <button 
          className="absolute bottom-4 bg-green-500 text-white py-2 px-4 rounded-md"
          onClick={handleToggle}
        >
          {isMinimized ? 'Show' : 'Hide'}
        </button>
      </div>
    </div>
  );
};

export default AnimatedComponent;
