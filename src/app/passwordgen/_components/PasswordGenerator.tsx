"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import React, { useState, useEffect, useCallback } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    lowercase: true,
    uppercase: true,
    numbers: true,
    specialChars: true,
  });
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    const { lowercase, uppercase, numbers, specialChars } = options;
    const charset = {
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      numbers: "0123456789",
      specialChars: "!@#$%^&*()_+[]{}|;:,.<>?/~`",
    };

    let passwordChars = "";
    if (lowercase) passwordChars += charset.lowercase;
    if (uppercase) passwordChars += charset.uppercase;
    if (numbers) passwordChars += charset.numbers;
    if (specialChars) passwordChars += charset.specialChars;

    if (passwordChars.length === 0) {
      setPassword(""); // Tidak ada karakter yang dipilih
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * passwordChars.length);
      generatedPassword += passwordChars[randomIndex];
    }

    setPassword(generatedPassword);
  }, [options, length]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Password Generator</h1>
      <Slider
        value={[length]}
        onValueChange={(value) => setLength(value[0])}
        min={8}
        max={20}
        step={1}
        className="mb-4"
      />
      <div className="mb-4">
        <label>
          <Input
            type="checkbox"
            checked={options.lowercase}
            onChange={() =>
              setOptions({ ...options, lowercase: !options.lowercase })
            }
          />
          Lowercase
        </label>
        <label>
          <Input
            type="checkbox"
            checked={options.uppercase}
            onChange={() =>
              setOptions({ ...options, uppercase: !options.uppercase })
            }
          />
          Uppercase
        </label>
        <label>
          <Input
            type="checkbox"
            checked={options.numbers}
            onChange={() =>
              setOptions({ ...options, numbers: !options.numbers })
            }
          />
          Numbers
        </label>
        <label>
          <Input
            type="checkbox"
            checked={options.specialChars}
            onChange={() =>
              setOptions({ ...options, specialChars: !options.specialChars })
            }
          />
          Special Characters
        </label>
      </div>
      <Button onClick={generatePassword} className="mr-2">
        Generate Password
      </Button>
      <Button onClick={copyToClipboard}>Copy to Clipboard</Button>
      <p className="mt-4">{password}</p>
    </div>
  );
};

export default PasswordGenerator;
