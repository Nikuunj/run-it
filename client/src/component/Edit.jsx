import React, { useContext, useEffect, useRef, useState } from 'react';
import Editor, { loader } from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import AppContext from './AppContext';

function Edit({ name, language, value, onChange, isMinimized, onMinimize }) {
  const constraintsRef = useContext(AppContext);
  const [isMaximized, setIsMaximized] = useState(false);
  const [zIndex, setZIndex] = useState(1); // State to manage zIndex
  const containerRef = useRef(null);

  useEffect(() => {
    loader.init().then((monaco) => {
      monaco.editor.defineTheme('myCustomTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [{ background: '1E1E1E' }],
        colors: {
          'editor.foreground': '#FFFFFF',
          'editor.background': '#1E1E1E',
          'editorCursor.foreground': '#8B0000',
          'editor.lineHighlightBackground': '#2B2B2B',
          'editorLineNumber.foreground': '#5A5A5A',
          'editor.selectionBackground': '#88000030',
          'editor.inactiveSelectionBackground': '#88000015',
        },
      });
    });
  }, []);

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
    onMinimize(pre => !pre);
  };

  const toggleMaximize = () => {
    setIsMaximized((prev) => !prev);
  };

  const handleClick = () => {
    // Bring this editor to the front by setting its zIndex higher
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
      onMouseDown={handleClick} // Update zIndex when editor is clicked
      onBlur={handleBlur} // Reset zIndex if needed when focus is lost
      className={`mb-7 ${isMaximized ? 'w-screen h-screen' : 'h-96'} rounded-lg shadow-lg`}
      style={{ position: 'relative', zIndex }} // Apply dynamic zInde
    >
      <div className="ps-2 bg-zinc-700 flex justify-between items-center rounded-t-lg">
        <span>{name}</span>
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
      <div className="block h-full rounded-b-lg">
        <Editor
          language={language}
          height="100%"
          width="100%"
          value={value}
          theme="myCustomTheme"
          onChange={(value) => onChange(value, language)}
          options={{
            automaticLayout: true,
            minimap: { enabled: false },
          }}
        />
      </div>
    </motion.div>
  );
}

export default Edit;
