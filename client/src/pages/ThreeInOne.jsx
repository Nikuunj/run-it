import React, { useState, useEffect } from 'react';
import Edit from '../component/Edit';
import BG from '../component/BG';
import Output from '../component/Output';

const ThreeInOne = () => {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [srcDoc, setSrcDoc] = useState('');
  const [isMinimized, setIsMinimized] = useState({
    html: false,
    css: false,
    javascript: false,
    output: false,
  });
  const [loading, setLoading] = useState(false); // New state for loading

  const handleChange = (value, language) => {
    if (typeof value === 'string') {
      if (language === 'html') setHtml(value);
      if (language === 'css') setCss(value);
      if (language === 'javascript') setJs(value);
    }
  };

  const handleMinimize = (language) => {
    setIsMinimized((prev) => ({
      ...prev,
      [language]: !prev[language],
    }));
  };

  const data = [
    {
      name: "HTML",
      language: "html",
      value: html,
      onChange: handleChange,
    },
    {
      name: "CSS",
      language: "css",
      value: css,
      onChange: handleChange,
    },
    {
      name: "JavaScript",
      language: "javascript",
      value: js,
      onChange: handleChange,
    },
  ];

  const output = () => (
    <iframe
      srcDoc={srcDoc}
      title="output"
      className='w-full bg-slate-200 border rounded h-64 md:h-96'
      sandbox="allow-scripts"
    />
  );

  const render = data.map((val, index) => (
    <Edit 
      key={index}
      name={val.name}
      language={val.language}
      value={val.value}
      onChange={val.onChange}
      isMinimized={isMinimized[val.language]}
      onMinimize={() => handleMinimize(val.language)}
    />
  ));

  useEffect(() => {
    setLoading(true); // Start loading
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Output</title>
          <style>${css}</style>
        </head>
        <body>${html}</body>
        <script>${js}</script>
        </html>
      `);
      setLoading(false); // Stop loading
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <div className="editor-container p-4 overflow-hidden min-h-screen min-w-[100vw] ms-2">
        <div className='editors grid gap-4 grid-cols-1 min-h-[50vh] z-40 md:grid-cols-2 lg:grid-cols-3'>
          {render}
          <Output out={output} isMinimized={isMinimized.output} onMinimize={() => handleMinimize('output')} />
        </div>
        <button id="run" onClick={() => {}} className='block bg-zinc-700 hover:bg-zinc-800 border-zinc-700 border-2 duration-300 relative top-3 mb-5 rounded-lg px-4 py-2 text-xl font-semibold'>
          {loading ? 'Running...' : 'Run Code'}  {/* Show loading text */}
        </button>
        <BG print='</HTML CSS & Js>' />
        <button
          className={`duration-300 ${isMinimized.html ? 'inline' : 'hidden'} fixed top-20 right-4 px-4 py-2 text-lg text-white hover:bg-red-600 bg-red-800`}
          onClick={() => handleMinimize('html')}
        >
          HTML
        </button>
        <button
          className={`duration-300 ${isMinimized.css ? 'inline' : 'hidden'} fixed top-32 right-4 px-4 py-2 text-lg text-white hover:bg-blue-600 bg-blue-800`}
          onClick={() => handleMinimize('css')}
        >
          CSS
        </button>
        <button
          className={`duration-300 ${isMinimized.javascript ? 'inline' : 'hidden'} fixed top-44 right-4 px-4 py-2 text-lg text-white hover:bg-amber-400 bg-amber-600`}
          onClick={() => handleMinimize('javascript')}
        >
          JS
        </button>
        <button
          className={`duration-300 ${isMinimized.output ? 'inline' : 'hidden'} fixed top-56 right-4 px-4 py-2 text-lg text-white hover:bg-green-600 bg-green-800`}
          onClick={() => handleMinimize('output')}
        >
          Output
        </button>
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="text-white text-xl">Loading...</div>  {/* Loading indicator */}
          </div>
        )}
      </div>
    </>
  );
};

export default ThreeInOne;
