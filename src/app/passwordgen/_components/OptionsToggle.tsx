import React from "react";

interface OptionsToggleProps {
  options: Record<string, boolean>;
  setOptions: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const OptionsToggle: React.FC<OptionsToggleProps> = ({
  options,
  setOptions,
}) => {
  const handleToggle = (option: string) => {
    setOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  return (
    <div>
      {Object.keys(options).map((option) => (
        <label key={option}>
          <input
            type="checkbox"
            checked={options[option]}
            onChange={() => handleToggle(option)}
          />
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </label>
      ))}
    </div>
  );
};

export default OptionsToggle;
