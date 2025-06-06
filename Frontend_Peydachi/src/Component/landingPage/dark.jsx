import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';

export default function DarkModeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if theme is already saved in localStorage
    const savedTheme = localStorage.getItem('theme');

    // If no theme saved in localStorage, check system preference
    if (savedTheme === null) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      // Apply the correct class based on system preference
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Apply saved theme from localStorage
      setIsDarkMode(savedTheme === 'dark');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  // Toggle the theme and save it to localStorage
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  };

  return (
    <div
      onClick={toggleDarkMode}
      className={`flex-start flex h-[48px] w-[100px] rounded-[30px] bg-zinc-100 p-[5px] shadow-inner hover:cursor-pointer dark:bg-zinc-700 ${isDarkMode ? 'place-content-end' : ''}`}
    >
      <motion.div
        className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-black/90"
        layout
        transition={spring}
      >
        <motion.div whileTap={{ rotate: 360 }}>
          {isDarkMode ? (
            <RiSunFill className="h-6 w-6 text-yellow-300" />
          ) : (
            <RiMoonClearFill className="h-6 w-6 text-slate-200" />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
