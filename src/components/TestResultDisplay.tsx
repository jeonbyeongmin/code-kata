"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TestResult } from "@/types";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface TestResultDisplayProps {
  result: TestResult | null;
  isRunning: boolean;
}

export function TestResultDisplay({
  result,
  isRunning,
}: TestResultDisplayProps) {
  if (isRunning) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
            Running Tests...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Executing your code against test cases...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            Ready to Test
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Click &quot;Run Tests&quot; to execute your code and see the
            results.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getStatusIcon = () => {
    if (result.passed) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  const getStatusBadge = () => {
    if (result.passed) {
      return (
        <Badge variant="default" className="bg-green-500">
          All Tests Passed!
        </Badge>
      );
    }
    return <Badge variant="destructive">Tests Failed</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            {getStatusIcon()}
            Test Results
          </CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm">
          <span>
            <span className="font-semibold">{result.passedTests}</span> /{" "}
            {result.totalTests} tests passed
          </span>
          <div className="flex-1 bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                result.passed ? "bg-green-500" : "bg-red-500"
              }`}
              style={{
                width: `${(result.passedTests / result.totalTests) * 100}%`,
              }}
            />
          </div>
        </div>

        {result.error && (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-md p-3">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-1">
              Error
            </h4>
            <pre className="text-sm text-red-700 dark:text-red-300 whitespace-pre-wrap">
              {result.error}
            </pre>
          </div>
        )}

        {result.output && (
          <div className="bg-muted rounded-md p-3">
            <h4 className="font-semibold mb-2">Test Details</h4>
            <pre className="text-sm whitespace-pre-wrap font-mono">
              {result.output}
            </pre>
          </div>
        )}

        {result.passed && (
          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md p-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="font-semibold text-green-800 dark:text-green-200">
                Congratulations! 🎉
              </span>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              You&apos;ve successfully solved today&apos;s problem! Come back
              tomorrow for a new challenge.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
