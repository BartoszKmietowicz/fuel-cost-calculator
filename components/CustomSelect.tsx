"use client"
import { useState } from "react";

const CustomSelect = ({
  options,
  value,
  onChange,
  setCost,
  calculateCost,
}: {
  options: Record<string, number>;
  value: string;
  onChange: (val: string) => void;
  setCost: (cost: number | null) => void;
  calculateCost: (fuelType: string) => number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-left"
      >
        {value} - {options[value]} PLN/l
      </button>

      {isOpen && (
        <ul className="absolute left-full top-0 ml-2 bg-white border border-gray-300 shadow-lg rounded-md w-48">
          {Object.keys(options).map((option) => (
            <li
              key={option}
              onClick={(e) => {
                e.preventDefault();
                onChange(option);
                setIsOpen(false);
              }}
              onMouseEnter={() => setCost(calculateCost(option))}
              onMouseLeave={() => setCost(calculateCost(value))}
              className="p-2 cursor-pointer hover:bg-teal-700 hover:bg-opacity-50 transition text-gray-700"
            >
              {option} - {options[option]} PLN/l
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;




