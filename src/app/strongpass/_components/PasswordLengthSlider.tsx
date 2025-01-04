"use client";

import { Slider } from "@/components/ui/slider";

interface PasswordLengthSliderProps {
  value: number;
  onChange: (value: number[]) => void;
}

export function PasswordLengthSlider({
  value,
  onChange,
}: PasswordLengthSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium leading-none">
          Panjang Password: {value}
        </label>
      </div>
      <Slider
        defaultValue={[value]}
        max={64}
        min={8}
        step={1}
        onValueChange={onChange}
      />
    </div>
  );
}
