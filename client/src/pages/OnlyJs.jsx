import React, { useState } from 'react';
import Edit from '../component/Edit';
import BG from '../component/BG';
import Output from '../component/Output';  // Import the Output component

function OnlyJs() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isMinimized, setIsMinimized] = useState({
    javascript: false,
    output: false,
  });

  const handleClick = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: input }),
    })
      .then((response) => response.json())
      .then((data) => {
        setOutput(data.output);
      })
      .catch((error) => {
        setOutput('Error: ' + error.message);
      });
  };

  const handleChange = (value) => {
    setInput(value);
  };

  const handleMinimize = (component) => {
    setIsMinimized((prev) => ({
      ...prev,
      [component]: !prev[component],
    }));
  };

  const data = [
    {
      name: "JavaScript",
      height: "96",
      width: "400",
      language: "javascript",
      value: input,
      onChange: handleChange,
    },
  ];

  const render = data.map((val, index) => (
    <Edit 
      key={index}
      name={val.name}
      height={val.height}
      width={val.width}
      language={val.language}
      value={val.value}
      onChange={val.onChange}
      isMinimized={isMinimized.javascript}
      onMinimize={() => handleMinimize('javascript')}
    />
  ));

  const outputData = () => (
    <pre id="output">{output}</pre>
  );

  return (
    <>
      <div className="container  min-h-screen">
        <div className='min-h-[80vh]'>
          {render}
        </div>
        <button id="run" onClick={handleClick} className='block'>Run Code</button>
        
        <Output 
          out={outputData} 
          isMinimized={isMinimized.output} 
          onMinimize={() => handleMinimize('output')} 
        />
      </div>
      <BG />
      <button
        className={`duration-300 ${isMinimized.javascript ? 'inline' : 'hidden'} fixed top-10 right-4 px-4 py-2 text-lg text-white hover:bg-amber-400 bg-amber-600`}
        onClick={() => handleMinimize('javascript')}
      >
        JS
      </button>
      <button
        className={`duration-300 z-40 ${isMinimized.output ? 'inline' : 'hidden'} fixed top-48 mt-2 right-4 px-4 py-2 text-lg text-white hover:bg-green-600 bg-green-800`}
        onClick={() => handleMinimize('output')}
      >
        Output
      </button>
    </>
  );
}

export default OnlyJs;
