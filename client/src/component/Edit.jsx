import React, { useContext, useEffect, useRef, useState } from 'react';
import Editor, { loader } from '@monaco-editor/react';
import { gsap } from 'gsap';
import Draggable from 'gsap/Draggable';
import AppContext from './AppContext';

gsap.registerPlugin(Draggable);

function Edit({ name, language, value, onChange, isMinimized, onMinimize }) {
  const constraintsRef = useContext(AppContext);
  const [isMaximized, setIsMaximized] = useState(false);
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

  useEffect(() => {
    const draggable = Draggable.create(containerRef.current, {
      bounds: constraintsRef.current,
      throwProps: true,
      onDrag: () => {},
      onDragEnd: () => {
        gsap.to(containerRef.current, {
          duration: 0.5,
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

  const toggleMinimize = () => {
    onMinimize((prev) => !prev);
  };

  const toggleMaximize = () => {
    setIsMaximized((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className={`mb-7 rounded-lg shadow-lg z-50 ${isMinimized ? 'overflow-hidden' : ''}`}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div className={`ps-2 bg-zinc-700 flex justify-between items-center rounded-t-lg ${isMinimized ? 'flex-col' : ''}`}>
        <span>{name}</span>
        <div className={`flex ${isMinimized ? 'flex-col' : ''}`}>
          <button
            onClick={toggleMinimize}
            className="bg-zinc-700 text-white px-4 hover:bg-slate-600 text-2xl"
            style={{ zIndex: 20 }}
          >
            <sup>_</sup>
          </button>
          <button
            onClick={toggleMaximize}
            className="bg-zinc-700 text-white hover:bg-slate-600 px-4 rounded-e-lg rounded-b-none"
            style={{ zIndex: 20 }}
          >
            {isMaximized ? '◱' : '▢'}
          </button>
        </div>
      </div>
      <div className="block z-50 h-full rounded-b-lg">
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
    </div>
  );
}

export default Edit;
