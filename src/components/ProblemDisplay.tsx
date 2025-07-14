"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Problem } from "@/types";

interface ProblemDisplayProps {
  problem: Problem;
}

export function ProblemDisplay({ problem }: ProblemDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{problem.title}</CardTitle>
            <CardDescription className="mt-1">
              Day {problem.day} • {problem.language}
            </CardDescription>
          </div>
          <Badge variant="outline">{problem.language}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Problem Description</h4>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {problem.description}
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Examples</h4>
          <div className="space-y-2">
            {problem.tests.slice(0, 2).map((test, index) => (
              <div key={index} className="bg-muted p-3 rounded text-sm">
                <div>
                  <span className="font-medium">Input:</span>{" "}
                  {JSON.stringify(test.input)}
                </div>
                <div>
                  <span className="font-medium">Output:</span>{" "}
                  {JSON.stringify(test.expected)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          💡 Tip: There are {problem.tests.length} test cases in total. Only the
          first 2 are shown as examples.
        </div>
      </CardContent>
    </Card>
  );
}
