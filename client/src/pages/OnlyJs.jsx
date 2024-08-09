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
  const [loading, setLoading] = useState(false);  // New state for loading

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true when request starts
    fetch('https://run-it-31la.onrender.com/run', {
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
      })
      .finally(() => {
        setLoading(false);  // Set loading to false when request completes
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
      <div className="container min-h-screen ms-2">
        <div>
          {render}
        </div>
        <button id="run" onClick={handleClick} className='block bg-zinc-700 hover:bg-zinc-800 border-zinc-700 border-2 duration-300 relative top-3 mb-5 rounded-lg px-4 py-2 text-xl font-semibold'>
          {loading ? 'Running...' : 'Run Code'}  {/* Show loading text */}
        </button>
        
        <Output 
          out={outputData} 
          isMinimized={isMinimized.output} 
          onMinimize={() => handleMinimize('output')} 
        />
      </div>
      <BG print='js'/>
      <button
        className={`duration-300 ${isMinimized.javascript ? 'inline' : 'hidden'} fixed top-36 right-4 px-4 py-2 text-lg text-white hover:bg-amber-400 bg-amber-600`}
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
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="text-white text-xl">Loading...</div>  {/* Loading indicator */}
        </div>
      )}
    </>
  );
}

export default OnlyJs;
