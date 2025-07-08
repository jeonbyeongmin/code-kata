"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgrammingLanguage } from "@/types";
import { LANGUAGE_CONFIGS } from "@/lib/languages";

interface LanguageSelectionProps {
  onLanguageSelect: (language: ProgrammingLanguage) => void;
}

export function LanguageSelection({
  onLanguageSelect,
}: LanguageSelectionProps) {
  const [selectedLanguage, setSelectedLanguage] =
    useState<ProgrammingLanguage | null>(null);

  const handleSelectLanguage = (language: ProgrammingLanguage) => {
    setSelectedLanguage(language);
  };

  const handleConfirm = () => {
    if (selectedLanguage) {
      onLanguageSelect(selectedLanguage);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Welcome to Code Kata
          </CardTitle>
          <CardDescription className="text-lg">
            Choose your programming language to start your coding journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge variant="outline" className="text-lg px-4 py-2">
              Day 0
            </Badge>
          </div>

          <div className="grid gap-4">
            {Object.entries(LANGUAGE_CONFIGS).map(([key, config]) => (
              <button
                key={key}
                onClick={() => handleSelectLanguage(key as ProgrammingLanguage)}
                className={`p-4 rounded-lg border-2 transition-all hover:border-primary ${
                  selectedLanguage === key
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">{config.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Start solving problems with {config.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">.{config.fileExtension}</Badge>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={handleConfirm}
              disabled={!selectedLanguage}
              size="lg"
              className="w-full max-w-md"
            >
              Start Coding Journey
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              💡 You&apos;ll solve one problem per day, starting from basic
              concepts and gradually increasing in difficulty.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
