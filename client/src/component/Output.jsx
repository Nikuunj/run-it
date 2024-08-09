import React, { useEffect, useRef, useContext, useState } from 'react';
import { gsap } from 'gsap';
import Draggable from 'gsap/Draggable';
import AppContext from './AppContext';

gsap.registerPlugin(Draggable);

const Output = ({ out, isMinimized, onMinimize }) => {
  const constraintsRef = useContext(AppContext);
  const containerRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const draggable = Draggable.create(containerRef.current, {
      bounds: constraintsRef.current,
      throwProps: true,
      trigger: containerRef.current,
      onDrag: () => {},
      onDragEnd: () => {
        gsap.to(containerRef.current, {
          duration: 0.1,
          ease: 'power2.out',
          x: gsap.getProperty(containerRef.current, 'x'),
          y: gsap.getProperty(containerRef.current, 'y'),
        });
      },
    });

    return () => {
      draggable[0].kill();
    };
  }, [constraintsRef]);

  useEffect(() => {
    const animationProps = isMinimized
      ? {
          duration: 0.8,
          x: '200%',
          y: '-15%',
          scaleX: 0.3,
          scaleY: 0.3,
          opacity: 0,
          visibility: 'hidden',
          width: 0,
          height: 0,
          ease: 'power2.out',
        }
      : {
          duration: 0.8,
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          opacity: 1,
          visibility: 'visible',
          width: isMaximized ? '98vw' : '40vw',
          height: isMaximized ? '100vh' : '24rem',
          ease: 'power2.out',
        };

    gsap.to(containerRef.current, animationProps);
  }, [isMinimized, isMaximized]);

  const toggleMaximize = () => {
    setIsMaximized((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className={`mb-7 rounded-[9px] shadow-lg  w-full bg-slate-200 h-64 md:h-96`}
      style={{ overflow: 'hidden', position:'relative' }}
    >
      <div className={`ps-2 bg-zinc-700 flex justify-between items-center rounded-t-[9px]`}>
        <span>Output</span>
        <div className={`flex`}>
          <button
            onClick={onMinimize}
            className="bg-zinc-700 text-white px-4 hover:bg-slate-600 text-2xl"
            
          >
            <sup>_</sup>
          </button>
          <button
            onClick={toggleMaximize}
            className="bg-zinc-700 text-white hover:bg-slate-600 px-4 rounded-e-[9px] rounded-b-none"
            
          >
            {isMaximized ? '◱' : '▢'}
          </button>
        </div>
      </div>
      <div className="block h-full rounded-b-[9px] text-black">
        {out()}
      </div>
    </div>
  );
};

export default Output;
