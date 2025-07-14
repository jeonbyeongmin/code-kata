"use client";

import { useState, useEffect } from "react";
import { LanguageSelection } from "@/components/LanguageSelection";
import { CodingInterface } from "@/components/CodingInterface";
import { Celebration } from "@/components/Celebration";
import { Problem, UserProgress, ProgrammingLanguage } from "@/types";
import { LocalStorageService } from "@/lib/storage";
import { LANGUAGE_CONFIGS } from "@/lib/languages";

type AppState = "loading" | "language-selection" | "coding" | "celebration";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("loading");
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [isGeneratingProblem, setIsGeneratingProblem] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const progress = LocalStorageService.getUserProgress();

        if (!progress) {
          // New user - show language selection
          setAppState("language-selection");
          return;
        }

        setUserProgress(progress);

        // Check if we need a new problem
        if (LocalStorageService.shouldGenerateNewProblem()) {
          await generateNewProblem(progress);
        } else {
          // Load existing problem
          const problem = LocalStorageService.getCurrentProblem();
          if (problem) {
            setCurrentProblem(problem);
            setAppState("coding");
          } else {
            await generateNewProblem(progress);
          }
        }
      } catch (error) {
        console.error("Failed to initialize app:", error);
        setAppState("language-selection");
      }
    };

    initializeApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateNewProblem = async (progress: UserProgress) => {
    setIsGeneratingProblem(true);

    try {
      // API route를 통해 문제 생성
      const response = await fetch("/api/problems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day: progress.currentDay,
          language: progress.language,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate problem from API");
      }

      const { problem } = await response.json();

      setCurrentProblem(problem);
      LocalStorageService.saveCurrentProblem(problem);
      setAppState("coding");
    } catch (error) {
      console.error("Failed to generate problem:", error);
      // Use fallback problem
      const fallbackProblem = createFallbackProblem(
        progress.currentDay,
        progress.language
      );
      setCurrentProblem(fallbackProblem);
      LocalStorageService.saveCurrentProblem(fallbackProblem);
      setAppState("coding");
    } finally {
      setIsGeneratingProblem(false);
    }
  };

  const createFallbackProblem = (
    day: number,
    language: ProgrammingLanguage
  ): Problem => {
    const problems = {
      0: {
        title: "Square Function",
        description:
          "Write a function that returns the square of a number.\n\nExample:\n- Input: 4\n- Output: 16",
        signature:
          language === "rust"
            ? "fn solution(n: i32) -> i32"
            : language === "python"
            ? "def solution(n):"
            : "function solution(n)",
        tests: [
          { input: 2, expected: 4 },
          { input: -3, expected: 9 },
          { input: 0, expected: 0 },
          { input: 5, expected: 25 },
        ],
      },
      1: {
        title: "Sum Two Numbers",
        description:
          "Write a function that returns the sum of two numbers.\n\nExample:\n- Input: 3, 7\n- Output: 10",
        signature:
          language === "rust"
            ? "fn solution(a: i32, b: i32) -> i32"
            : language === "python"
            ? "def solution(a, b):"
            : "function solution(a, b)",
        tests: [
          { input: [1, 2], expected: 3 },
          { input: [-1, 1], expected: 0 },
          { input: [0, 0], expected: 0 },
          { input: [10, -5], expected: 5 },
        ],
      },
      2: {
        title: "Is Even",
        description:
          "Write a function that checks if a number is even.\n\nExample:\n- Input: 4\n- Output: true\n- Input: 3\n- Output: false",
        signature:
          language === "rust"
            ? "fn solution(n: i32) -> bool"
            : language === "python"
            ? "def solution(n):"
            : "function solution(n)",
        tests: [
          { input: 2, expected: true },
          { input: 3, expected: false },
          { input: 0, expected: true },
          { input: -4, expected: true },
          { input: -3, expected: false },
        ],
      },
      3: {
        title: "Maximum of Three",
        description:
          "Write a function that returns the maximum of three numbers.\n\nExample:\n- Input: 1, 5, 3\n- Output: 5",
        signature:
          language === "rust"
            ? "fn solution(a: i32, b: i32, c: i32) -> i32"
            : language === "python"
            ? "def solution(a, b, c):"
            : "function solution(a, b, c)",
        tests: [
          { input: [1, 5, 3], expected: 5 },
          { input: [10, 2, 8], expected: 10 },
          { input: [-1, -5, -3], expected: -1 },
          { input: [7, 7, 7], expected: 7 },
        ],
      },
      4: {
        title: "Count Characters",
        description:
          'Write a function that counts the number of characters in a string.\n\nExample:\n- Input: "hello"\n- Output: 5',
        signature:
          language === "rust"
            ? "fn solution(s: &str) -> usize"
            : language === "python"
            ? "def solution(s):"
            : "function solution(s)",
        tests: [
          { input: "hello", expected: 5 },
          { input: "", expected: 0 },
          { input: "a", expected: 1 },
          { input: "hello world", expected: 11 },
        ],
      },
    };

    const problemData =
      problems[day as keyof typeof problems] ||
      problems[(day % 5) as keyof typeof problems];

    return {
      id: `fallback_day_${day}`,
      day,
      language,
      ...problemData,
      starterCode:
        language === "javascript"
          ? `function solution(${
              problemData.signature.includes(",")
                ? problemData.signature.match(/\(([^)]+)\)/)?.[1] || ""
                : problemData.signature.includes("(")
                ? problemData.signature.match(/\(([^)]*)\)/)?.[1] || ""
                : "n"
            }) {
    // Your code here
}`
          : LANGUAGE_CONFIGS[language].starterTemplate,
    };
  };

  const handleLanguageSelect = (language: ProgrammingLanguage) => {
    const progress = LocalStorageService.initializeUser(language);
    setUserProgress(progress);
    generateNewProblem(progress);
  };

  const handleProblemComplete = () => {
    setAppState("celebration");
  };

  const handleContinue = () => {
    const updatedProgress = LocalStorageService.getUserProgress();
    if (updatedProgress) {
      setUserProgress(updatedProgress);
      generateNewProblem(updatedProgress);
    }
  };

  const handleReset = () => {
    LocalStorageService.clearAll();
    setUserProgress(null);
    setCurrentProblem(null);
    setAppState("language-selection");
  };

  if (appState === "loading" || isGeneratingProblem) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="text-muted-foreground">
            {isGeneratingProblem
              ? "Generating your challenge..."
              : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  if (appState === "language-selection") {
    return <LanguageSelection onLanguageSelect={handleLanguageSelect} />;
  }

  if (appState === "celebration" && userProgress) {
    return (
      <Celebration userProgress={userProgress} onContinue={handleContinue} />
    );
  }

  if (appState === "coding" && currentProblem && userProgress) {
    return (
      <CodingInterface
        problem={currentProblem}
        userProgress={userProgress}
        onProblemComplete={handleProblemComplete}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p>Something went wrong. Please refresh the page.</p>
    </div>
  );
}
