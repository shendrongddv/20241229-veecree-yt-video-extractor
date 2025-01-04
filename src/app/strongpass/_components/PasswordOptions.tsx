"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export interface PasswordOptions {
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
  ambiguous: boolean;
}

interface PasswordOptionsProps {
  options: PasswordOptions;
  onToggle: (key: keyof PasswordOptions) => void;
}

export function PasswordOptions({ options, onToggle }: PasswordOptionsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="lowercase"
          checked={options.lowercase}
          onCheckedChange={() => onToggle("lowercase")}
        />
        <Label htmlFor="lowercase">Huruf Kecil (a-z)</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="uppercase"
          checked={options.uppercase}
          onCheckedChange={() => onToggle("uppercase")}
        />
        <Label htmlFor="uppercase">Huruf Besar (A-Z)</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="numbers"
          checked={options.numbers}
          onCheckedChange={() => onToggle("numbers")}
        />
        <Label htmlFor="numbers">Angka (0-9)</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="symbols"
          checked={options.symbols}
          onCheckedChange={() => onToggle("symbols")}
        />
        <Label htmlFor="symbols">Simbol (!@#$%^&*)</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="ambiguous"
          checked={options.ambiguous}
          onCheckedChange={() => onToggle("ambiguous")}
        />
        <Label htmlFor="ambiguous">Karakter Ambigu (l, 1, I, O, 0)</Label>
      </div>
    </div>
  );
}
