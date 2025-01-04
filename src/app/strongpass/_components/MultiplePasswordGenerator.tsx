"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface MultiplePasswordGeneratorProps {
  onGenerate: () => string;
}

export function MultiplePasswordGenerator({
  onGenerate,
}: MultiplePasswordGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(5);
  const [passwords, setPasswords] = useState<string[]>([]);

  const handleGenerate = () => {
    const newPasswords = Array.from({ length: count }, () => onGenerate());
    setPasswords(newPasswords);
  };

  const copyAllPasswords = async () => {
    try {
      await navigator.clipboard.writeText(passwords.join("\n"));
      toast.success("Semua password berhasil disalin!");
    } catch {
      toast.error("Gagal menyalin password");
    }
  };

  const copyPassword = async (password: string) => {
    try {
      await navigator.clipboard.writeText(password);
      toast.success("Password berhasil disalin!");
    } catch {
      toast.error("Gagal menyalin password");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Generate Multiple Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Generate Multiple Password</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Jumlah Password</Label>
            <Input
              type="number"
              min={1}
              max={20}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            />
          </div>
          <Button className="w-full" onClick={handleGenerate}>
            Generate {count} Password
          </Button>
          {passwords.length > 0 && (
            <>
              <ScrollArea className="h-[200px] rounded-md border p-2">
                <div className="space-y-2">
                  {passwords.map((pass, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border p-2"
                    >
                      <code className="font-mono">{pass}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyPassword(pass)}
                      >
                        Salin
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <Button
                variant="outline"
                className="w-full"
                onClick={copyAllPasswords}
              >
                Salin Semua Password
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
