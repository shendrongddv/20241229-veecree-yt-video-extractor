"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { PasswordLengthSlider } from "./PasswordLengthSlider";
import {
  PasswordOptions,
  type PasswordOptions as PasswordOptionsType,
} from "./PasswordOptions";
import { PasswordStrength } from "./PasswordStrength";
import { MultiplePasswordGenerator } from "./MultiplePasswordGenerator";

const HISTORY_KEY = "passwordHistory";
const CONFIG_KEY = "passwordConfig";

export function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState<PasswordOptionsType>({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
    ambiguous: false,
  });

  // Load saved configuration
  useEffect(() => {
    const savedConfig = localStorage.getItem(CONFIG_KEY);
    if (savedConfig) {
      const config = JSON.parse(savedConfig);
      setLength(config.length);
      setOptions(config.options);
    }
  }, []);

  const generatePassword = (): string => {
    let chars = "";
    if (options.lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (options.uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.numbers) chars += "0123456789";
    if (options.symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!options.ambiguous && chars.length > 0) {
      chars = chars.replace(/[lI1O0]/g, "");
    }

    if (chars.length === 0) {
      toast.error("Pilih minimal satu opsi karakter");
      return "";
    }

    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(result);

    // Update history
    const historyData = localStorage.getItem(HISTORY_KEY);
    const history = historyData ? JSON.parse(historyData) : [];
    const newHistory = [
      {
        password: result,
        createdAt: new Date().toISOString(),
      },
      ...history,
    ].slice(0, 5);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));

    return result;
  };

  const copyToClipboard = async () => {
    if (!password) {
      toast.error("Generate password terlebih dahulu");
      return;
    }
    try {
      await navigator.clipboard.writeText(password);
      toast.success("Password berhasil disalin!");
    } catch {
      toast.error("Gagal menyalin password");
    }
  };

  const handleToggleOption = (key: keyof PasswordOptionsType) => {
    setOptions((prev) => {
      const newOptions = { ...prev, [key]: !prev[key] };
      const hasActiveOption = Object.values(newOptions).some((value) => value);
      if (!hasActiveOption) {
        toast.error("Minimal satu opsi harus aktif");
        return prev;
      }
      // Save configuration
      localStorage.setItem(
        CONFIG_KEY,
        JSON.stringify({ length, options: newOptions }),
      );
      return newOptions;
    });
  };

  const handleLengthChange = (values: number[]) => {
    const newLength = values[0];
    setLength(newLength);
    // Save configuration
    localStorage.setItem(
      CONFIG_KEY,
      JSON.stringify({ length: newLength, options }),
    );
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2">
        <div className="flex space-x-2">
          <div className="flex-1">
            <Input
              value={password}
              readOnly
              placeholder="Klik tombol Generate untuk membuat password"
              className="font-mono"
            />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={copyToClipboard}>
              Salin
            </Button>
          </div>
        </div>
      </div>

      <PasswordLengthSlider value={length} onChange={handleLengthChange} />

      <PasswordOptions options={options} onToggle={handleToggleOption} />

      <PasswordStrength password={password} />

      <div className="space-y-2">
        <Button className="w-full" onClick={generatePassword}>
          Generate Password Baru
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <MultiplePasswordGenerator onGenerate={generatePassword} />
        </div>
      </div>
    </div>
  );
}
