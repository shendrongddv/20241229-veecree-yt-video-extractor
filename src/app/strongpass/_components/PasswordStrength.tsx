"use client";

import { Progress } from "@/components/ui/progress";

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const calculateStrength = (pass: string) => {
    let score = 0;

    // Panjang
    if (pass.length >= 12) score += 25;
    else if (pass.length >= 8) score += 15;

    // Kompleksitas
    if (/[a-z]/.test(pass)) score += 15;
    if (/[A-Z]/.test(pass)) score += 15;
    if (/[0-9]/.test(pass)) score += 15;
    if (/[^A-Za-z0-9]/.test(pass)) score += 15;

    // Variasi karakter
    const uniqueChars = new Set(pass).size;
    score += Math.min(15, uniqueChars);

    return Math.min(100, score);
  };

  const strength = calculateStrength(password);

  const getStrengthText = (score: number) => {
    if (score >= 80) return "Sangat Kuat";
    if (score >= 60) return "Kuat";
    if (score >= 40) return "Sedang";
    return "Lemah";
  };

  const getStrengthColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-blue-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Kekuatan Password:</span>
        <span className="font-medium">{getStrengthText(strength)}</span>
      </div>
      <Progress value={strength} className={getStrengthColor(strength)} />
    </div>
  );
}
