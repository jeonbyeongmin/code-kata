"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeEditor } from "./CodeEditor";
import { ProblemDisplay } from "./ProblemDisplay";
import { TestResultDisplay } from "./TestResultDisplay";
import { Problem, TestResult, UserProgress } from "@/types";
import { CodeExecutionService } from "@/lib/codeExecution";
import { LocalStorageService } from "@/lib/storage";
import { LANGUAGE_CONFIGS } from "@/lib/languages";
import { Play, RotateCcw, Settings } from "lucide-react";

interface CodingInterfaceProps {
  problem: Problem;
  userProgress: UserProgress;
  onProblemComplete: () => void;
  onReset: () => void;
}

export function CodingInterface({
  problem,
  userProgress,
  onProblemComplete,
  onReset,
}: CodingInterfaceProps) {
  const [code, setCode] = useState("");
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Load saved code or use starter code
    const savedCode = LocalStorageService.getUserCode(problem.id);
    setCode(
      savedCode ||
        problem.starterCode ||
        LANGUAGE_CONFIGS[problem.language].starterTemplate
    );
    setTestResult(null);
  }, [problem]);

  useEffect(() => {
    // Auto-save code as user types
    if (code) {
      LocalStorageService.saveUserCode(problem.id, code);
    }
  }, [code, problem.id]);

  const handleRunTests = async () => {
    if (!code.trim()) {
      setTestResult({
        passed: false,
        totalTests: problem.tests.length,
        passedTests: 0,
        error: "Please write some code first",
      });
      return;
    }

    setIsRunning(true);
    setTestResult(null);

    try {
      // Validate code first
      const validation = CodeExecutionService.validateCode(
        code,
        problem.language
      );
      if (!validation.valid) {
        setTestResult({
          passed: false,
          totalTests: problem.tests.length,
          passedTests: 0,
          error: validation.error,
        });
        return;
      }

      // Execute code
      const result = await CodeExecutionService.executeCode(code, problem);
      setTestResult(result);

      // If all tests passed, mark problem as complete
      if (result.passed) {
        LocalStorageService.completeProblem(problem.id);
        setTimeout(() => {
          onProblemComplete();
        }, 2000); // Give user time to see the success message
      }
    } catch (error) {
      setTestResult({
        passed: false,
        totalTests: problem.tests.length,
        passedTests: 0,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(
      problem.starterCode || LANGUAGE_CONFIGS[problem.language].starterTemplate
    );
    setTestResult(null);
  };

  const handleResetProgress = () => {
    if (
      confirm(
        "Are you sure you want to reset all progress? This cannot be undone."
      )
    ) {
      onReset();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Code Kata</h1>
            <Badge variant="outline" className="text-sm">
              Day {userProgress.currentDay}
            </Badge>
            <Badge variant="secondary">
              {LANGUAGE_CONFIGS[userProgress.language].name}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetProgress}
              className="text-xs"
            >
              <Settings className="h-3 w-3 mr-1" />
              Reset Progress
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Problem Description */}
          <div className="space-y-6">
            <ProblemDisplay problem={problem} />
            <TestResultDisplay result={testResult} isRunning={isRunning} />
          </div>

          {/* Right Column - Code Editor */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Code Editor</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                      disabled={isRunning}
                    >
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Reset
                    </Button>
                    <Button
                      onClick={handleRunTests}
                      disabled={isRunning}
                      size="sm"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      {isRunning ? "Running..." : "Run Tests"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CodeEditor
                  language={problem.language}
                  value={code}
                  onChange={setCode}
                  readOnly={isRunning}
                />
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">💡 Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  • Make sure to implement a function named &quot;solution&quot;
                </p>
                <p>• Your code is automatically saved as you type</p>
                <p>
                  • Test your code with the examples before running all tests
                </p>
                <p>• Take your time - there&apos;s no time limit!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
