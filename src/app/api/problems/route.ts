import { NextRequest, NextResponse } from "next/server";
import { ProblemGeneratorService } from "@/lib/problemGenerator";

export async function POST(request: NextRequest) {
  try {
    const { day, language } = await request.json();

    if (!Number.isInteger(day) || day < 0 || !language) {
      return NextResponse.json(
        { error: "Day and language are required" },
        { status: 400 }
      );
    }

    // API 키는 서버 환경변수에서 가져옵니다
    const apiKey = process.env.GOOGLE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const problemGenerator = new ProblemGeneratorService(apiKey);
    const problem = await problemGenerator.generateProblem(day, language);

    return NextResponse.json({ problem });
  } catch (error) {
    console.error("Failed to generate problem:", error);
    return NextResponse.json(
      { error: "Failed to generate problem" },
      { status: 500 }
    );
  }
}
