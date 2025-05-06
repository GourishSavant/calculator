
// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import SwitcherDesi from '../Utils/toggle.jsx';

// function Navbar() {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     const storedMode = localStorage.getItem('darkMode');
//     if (storedMode === 'true') {
//       setIsDarkMode(true);
//       document.documentElement.classList.add('dark');
//     }
//   }, []);

//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('darkMode', 'true');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('darkMode', 'false');
//     }
//   }, [isDarkMode]);

//   const navItems = [
//     { label: 'Home', path: '/home' },
//     { label: 'Exchange Rates (Live)', path: '/exchange-rates' },
//     { label: 'About', path: '/about' },
//     { label: 'Error Page', path: '/error' },
//   ];

//   return (
//     <nav className="fixed top-0 h-24 left-0 right-0 z-50 bg-[#1976d2] dark:bg-gray-800 text-white px-16 py-5 shadow-md flex items-center justify-between">
//       <div className="text-2xl font-2xl">Loan Calculator</div>
//       <div className="flex items-center space-x-6">
//         {navItems.map(({ label, path }) => (
//           <NavLink
//             key={label}
//             to={path}
//             className={({ isActive }) =>
//               `text-xl px-4 py-2 rounded ${
//                 isActive ? 'bg-[#1e88e5]'  : 'hover:bg-[#2979ff]'
//               } dark:bg-gray-800 dark:hover:bg-gray-700`
//             }
//           >
//             {label}
//           </NavLink>
//         ))}
//         <SwitcherDesi
//           isChecked={isDarkMode}
//           onToggle={() => setIsDarkMode((prev) => !prev)}
//         />
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import SwitcherDesi from '../Utils/toggle.jsx';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode === 'true') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  const navItems = [
    { label: 'Home', path: '/home' },
    { label: 'Exchange Rates (Live)', path: '/exchange-rates' },
    { label: 'About', path: '/about' },
    { label: 'Error Page', path: '/error' },
  ];

  return (
    <nav className="fixed top-0 h-24 left-0 right-0 z-50 bg-[#1976d2] dark:bg-gray-800 text-white px-6 md:px-16 py-5 shadow-md flex items-center justify-between">
      <div className="text-2xl font-2xl">Loan Calculator</div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-6">
        {navItems.map(({ label, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `text-xl px-4 py-2 rounded ${
                isActive ? 'bg-[#1e88e5]' : 'hover:bg-[#2979ff]'
              } dark:bg-gray-800 dark:hover:bg-gray-700`
            }
          >
            {label}
          </NavLink>
        ))}
        <SwitcherDesi
          isChecked={isDarkMode}
          onToggle={() => setIsDarkMode((prev) => !prev)}
        />
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-white"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-24 left-0 w-full bg-[#1976d2] dark:bg-gray-800 flex flex-col items-start px-6 py-4 space-y-4 md:hidden">
          {navItems.map(({ label, path }) => (
            <NavLink
              key={label}
              to={path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `text-xl w-full px-4 py-2 rounded ${
                  isActive ? 'bg-[#1e88e5]' : 'hover:bg-[#2979ff]'
                } dark:bg-gray-800 dark:hover:bg-gray-700`
              }
            >
              {label}
            </NavLink>
          ))}
          <div className="mt-2">
            <SwitcherDesi
              isChecked={isDarkMode}
              onToggle={() => setIsDarkMode((prev) => !prev)}
            />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
