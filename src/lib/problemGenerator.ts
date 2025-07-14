import { GoogleGenerativeAI } from "@google/generative-ai";
import { Problem, ProgrammingLanguage } from "@/types";

export class ProblemGeneratorService {
  private genAI: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateProblem(
    day: number,
    language: ProgrammingLanguage
  ): Promise<Problem> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const difficultyLevel = this.getDifficultyLevel(day);
    const prompt = this.createPrompt(day, language, difficultyLevel);

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const problemData = this.parseProblemResponse(text);

      return {
        id: `day_${day}_${Date.now()}`,
        day,
        language,
        ...problemData,
      };
    } catch (error) {
      console.error("Failed to generate problem:", error);
      return this.getFallbackProblem(day, language);
    }
  }

  private getDifficultyLevel(day: number): string {
    if (day <= 5) return "beginner";
    if (day <= 15) return "easy";
    if (day <= 30) return "medium";
    if (day <= 50) return "medium-hard";
    return "hard";
  }

  private createPrompt(
    day: number,
    language: ProgrammingLanguage,
    difficulty: string
  ): string {
    const languageSpecs = {
      rust: {
        syntax: "Rust",
        example: "fn solution(n: i32) -> i32 { n * n }",
        types: "i32, f64, String, Vec<i32>, bool",
      },
      javascript: {
        syntax: "JavaScript",
        example: "function solution(n) { return n * n; }",
        types: "number, string, boolean, array",
      },
      python: {
        syntax: "Python",
        example: "def solution(n): return n * n",
        types: "int, float, str, list, bool",
      },
    };

    const spec = languageSpecs[language];

    return `Generate a coding problem for Day ${day} with ${difficulty} difficulty in ${spec.syntax}.

Requirements:
- The problem should be a single function
- Include 4-6 test cases with diverse inputs
- Function signature should be simple and clear
- Function name should be "solution"
- Problem should be solvable in 5-15 minutes
- Focus on basic algorithms, math, or string manipulation

Respond ONLY with a valid JSON object in this exact format:
{
  "title": "Problem Title",
  "description": "Clear problem description with examples",
  "signature": "${spec.example}",
  "tests": [
    {"input": 5, "expected": 25},
    {"input": -3, "expected": 9}
  ],
  "starterCode": "function template with comments"
}

Make sure:
- All test inputs/outputs are valid ${spec.syntax} values
- Description includes input/output format
- Starter code has helpful comments
- JSON is properly formatted without markdown blocks`;
  }

  private parseProblemResponse(
    response: string
  ): Omit<Problem, "id" | "day" | "language"> {
    try {
      // Remove potential markdown blocks
      const cleaned = response.replace(/```json\n?|\n?```/g, "").trim();
      const data = JSON.parse(cleaned);

      return {
        title: data.title || "Generated Problem",
        description: data.description || "Solve this problem.",
        signature: data.signature || "function solution() {}",
        tests: data.tests || [],
        starterCode: data.starterCode,
      };
    } catch (error) {
      console.error("Failed to parse problem response:", error);
      throw new Error("Invalid response format");
    }
  }

  private getFallbackProblem(
    day: number,
    language: ProgrammingLanguage
  ): Problem {
    const fallbacks = {
      rust: {
        title: "Square Function",
        description: "Write a function that returns the square of a number.",
        signature: "fn square(n: i32) -> i32",
        tests: [
          { input: 2, expected: 4 },
          { input: -3, expected: 9 },
          { input: 0, expected: 0 },
          { input: 5, expected: 25 },
        ],
        starterCode: `fn square(n: i32) -> i32 {
    // Your code here
}`,
      },
      javascript: {
        title: "Square Function",
        description: "Write a function that returns the square of a number.",
        signature: "function square(n)",
        tests: [
          { input: 2, expected: 4 },
          { input: -3, expected: 9 },
          { input: 0, expected: 0 },
          { input: 5, expected: 25 },
        ],
        starterCode: `function square(n) {
    // Your code here
}`,
      },
      python: {
        title: "Square Function",
        description: "Write a function that returns the square of a number.",
        signature: "def square(n):",
        tests: [
          { input: 2, expected: 4 },
          { input: -3, expected: 9 },
          { input: 0, expected: 0 },
          { input: 5, expected: 25 },
        ],
        starterCode: `def square(n):
    # Your code here
    pass`,
      },
    };

    const fallback = fallbacks[language];
    return {
      id: `fallback_day_${day}`,
      day,
      language,
      ...fallback,
    };
  }
}
