import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="backdrop-blur-sm bg-white/5 text-2xl py-2 px-2 z-50 text-zinc-400 font-bold drop-shadow-2xl shadow-zinc-500 flex justify-between">
      <div className="flex flex-col">
        <p className="mb-2">Connect with me:</p>
        <div className="flex space-x-4">
          <a
            href="https://www.linkedin.com/in/makwana-nikunj/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 duration-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/Nikuunj"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="mailto:maxultron301@gmail.com"
            className="hover:text-zinc-600 duration-300"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
      <p className="mt-4">&copy; {new Date().getFullYear()} Nikunj Makwana</p>
    </footer>
  );
}

export default Footer;
