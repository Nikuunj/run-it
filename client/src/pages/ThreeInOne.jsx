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

  const handleChange = (value, language) => {
    if (language === 'html') setHtml(value);
    if (language === 'css') setCss(value);
    if (language === 'javascript') setJs(value);
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
      height: "200",
      width: "400",
      language: "html",
      value: html,
      onChange: handleChange,
    },
    {
      name: "CSS",
      height: "200",
      width: "400",
      language: "css",
      value: css,
      onChange: handleChange,
    },
    {
      name: "JavaScript",
      height: "200",
      width: "400",
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
      height={val.height}
      width={val.width}
      language={val.language}
      value={val.value}
      onChange={val.onChange}
      isMinimized={isMinimized[val.language]}
      onMinimize={() => handleMinimize(val.language)}
    />
  ));

  useEffect(() => {
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
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div className="editor-container p-4 overflow-hidden">
      <div className='editors grid gap-4 grid-cols-1 min-h-[50vh] md:grid-cols-2 lg:grid-cols-3'>
        {render}
        <Output out={output} isMinimized={isMinimized.output} onMinimize={() => handleMinimize('output')} />
      </div>
      <BG print='Html, CSS & Js'/>

      <button
        className={`duration-300 z-40 ${isMinimized.javascript ? 'inline' : 'hidden'} fixed top-10 right-4 px-4 py-2 text-lg text-white hover:bg-amber-400 bg-amber-600`}
        onClick={() => handleMinimize('javascript')}
      >
        JS
      </button>
      <button
        className={`duration-300 z-40 ${isMinimized.html ? 'inline' : 'hidden'} fixed top-24 right-4 px-4 py-2 text-lg text-white hover:bg-red-600 bg-red-800`}
        onClick={() => handleMinimize('html')}
      >
        HTML
      </button>
      <button
        className={`duration-300 z-40 ${isMinimized.css ? 'inline' : 'hidden'} fixed top-36 mt-2 right-4 px-4 py-2 text-lg text-white hover:bg-blue-600 bg-blue-800`}
        onClick={() => handleMinimize('css')}
      >
        CSS
      </button>
      <button
        className={`duration-300 z-40 ${isMinimized.output ? 'inline' : 'hidden'} fixed top-48 mt-4 right-4 px-4 py-2 text-lg text-white hover:bg-green-600 bg-green-800`}
        onClick={() => handleMinimize('output')}
      >
        Output
      </button>
    </div>
  );
};

export default ThreeInOne;