"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserProgress } from "@/types";
import { Trophy, Calendar, Target, ArrowRight } from "lucide-react";

interface CelebrationProps {
  userProgress: UserProgress;
  onContinue: () => void;
}

export function Celebration({ userProgress, onContinue }: CelebrationProps) {
  const nextDay = userProgress.currentDay;
  const streak = userProgress.completedProblems.length;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto animate-bounce" />
          </div>
          <CardTitle className="text-3xl font-bold">
            Congratulations! 🎉
          </CardTitle>
          <CardDescription className="text-lg">
            You&apos;ve successfully completed today&apos;s challenge!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <Calendar className="h-8 w-8 mx-auto text-primary" />
              <div>
                <div className="text-2xl font-bold">{nextDay}</div>
                <div className="text-sm text-muted-foreground">Current Day</div>
              </div>
            </div>
            <div className="space-y-2">
              <Target className="h-8 w-8 mx-auto text-green-500" />
              <div>
                <div className="text-2xl font-bold">{streak}</div>
                <div className="text-sm text-muted-foreground">
                  Problems Solved
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Badge variant="outline" className="h-8 px-3 text-sm">
                {userProgress.language.toUpperCase()}
              </Badge>
              <div>
                <div className="text-sm text-muted-foreground">Language</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 text-center">
            <h3 className="font-semibold mb-2">What&apos;s Next?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your progress has been saved! Come back tomorrow for a new
              challenge that&apos;s perfectly tailored to your current skill
              level.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <span>Day {nextDay}</span>
              <ArrowRight className="h-4 w-4" />
              <span>Day {nextDay + 1}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button onClick={onContinue} size="lg" className="w-full">
              Continue to Day {nextDay + 1}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                🔥 Keep up the momentum! Daily practice makes you a better
                programmer.
              </p>
            </div>
          </div>

          <div className="text-center text-xs text-muted-foreground space-y-1">
            <p>
              Tip: Try to solve tomorrow&apos;s problem in a different way or
              optimize your solution for better performance!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
