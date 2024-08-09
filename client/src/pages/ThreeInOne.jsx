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

  const minimizedButtons = Object.keys(isMinimized).filter(key => isMinimized[key]).map((key, index) => {
    const language = key.charAt(0).toUpperCase() + key.slice(1);
    const colorMap = {
      html: 'bg-red-800 hover:bg-red-600',
      css: 'bg-blue-800 hover:bg-blue-600',
      javascript: 'bg-amber-600 hover:bg-amber-400',
      output: 'bg-green-800 hover:bg-green-600',
    };

    return (
      <button
        key={key}
        className={`duration-300 inline absolute top-${10 + index * 14} ${index > 1 && 'hidden '} mt-5 right-4 px-4 py-2 text-lg text-white ${colorMap[key]}`}
        onClick={() => handleMinimize(key)}
      >
        {language}
      </button>
    );
  });

  return (
    <div className="editor-container p-4 overflow-hidden">
      <div className='editors grid gap-4 grid-cols-1 min-h-[50vh] z-40 md:grid-cols-2 lg:grid-cols-3'>
        {render}
        <Output out={output} isMinimized={isMinimized.output} onMinimize={() => handleMinimize('output')} />
      </div>
      <BG print='</HTML CSS & Js>' />
      {minimizedButtons}
    </div>
  );
};

export default ThreeInOne;
