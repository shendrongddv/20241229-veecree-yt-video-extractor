import React from "react";

interface PasswordLengthSliderProps {
  length: number;
  setLength: React.Dispatch<React.SetStateAction<number>>;
}

const PasswordLengthSlider: React.FC<PasswordLengthSliderProps> = ({
  length,
  setLength,
}) => {
  return (
    <div>
      <label>Password Length: {length}</label>
      <input
        type="range"
        min="8"
        max="64"
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
      />
    </div>
  );
};

export default PasswordLengthSlider;
