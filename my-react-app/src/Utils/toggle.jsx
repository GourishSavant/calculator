// components/SwitcherDesi.js
import React from 'react';

const SwitcherDesi = ({ isChecked, onToggle }) => {
  return (
    <label className="flex items-center cursor-pointer select-none text-dark dark:text-white">
      <div className="relative">
        <input
          id="desi-toggle"
          type="checkbox"
          className="peer sr-only"
          checked={isChecked}
          onChange={onToggle}
        />
        <div className="w-14 h-5 transition bg-blue-900 rounded-full shadow-inner box bg-dark dark:bg-blue-800 peer-checked:bg-[#82b1ff] peer-checked:dark:bg-blue-200"></div>
        <div className="absolute left-0 -top-1 h-7 w-7 flex items-center justify-center rounded-full bg-white dark:bg-blue-300 text-dark peer-checked:translate-x-full peer-checked:bg-primary peer-checked:text-white transition dot shadow-switch-1">
          <span className="w-4 h-4 border border-current rounded-full  active"></span>
        </div>
      </div>
    </label>
  );
};

export default SwitcherDesi;
