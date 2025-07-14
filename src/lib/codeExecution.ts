import { TestResult, Problem, ProgrammingLanguage } from "@/types";

interface TestExecutionResult {
  passed: boolean;
  input?: unknown;
  expected?: unknown;
  actual?: unknown;
  error?: string;
}

export class CodeExecutionService {
  static async executeCode(
    code: string,
    problem: Problem
  ): Promise<TestResult> {
    try {
      switch (problem.language) {
        case "javascript":
          return this.executeJavaScript(code, problem);
        case "python":
          return this.executePython(code, problem);
        case "rust":
          return this.executeRust(code, problem);
        default:
          throw new Error(`Unsupported language: ${problem.language}`);
      }
    } catch (error) {
      return {
        passed: false,
        totalTests: problem.tests.length,
        passedTests: 0,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  private static executeJavaScript(code: string, problem: Problem): TestResult {
    try {
      // Create a safe execution context
      const safeCode = `
        ${code}
        
        const testResults = [];
        const tests = ${JSON.stringify(problem.tests)};
        
        for (let i = 0; i < tests.length; i++) {
          try {
            const test = tests[i];
            let result;
            
            // Handle different input types
            if (Array.isArray(test.input)) {
              result = solution(...test.input);
            } else {
              result = solution(test.input);
            }
            
            const passed = JSON.stringify(result) === JSON.stringify(test.expected);
            testResults.push({ passed, input: test.input, expected: test.expected, actual: result });
          } catch (err) {
            testResults.push({ passed: false, error: err.message, input: tests[i].input, expected: tests[i].expected });
          }
        }
        
        return testResults;
      `;

      // Execute in isolated context
      const func = new Function(safeCode);
      const results = func();

      // Validate results
      if (!Array.isArray(results)) {
        throw new Error("Test execution did not return expected results");
      }

      const passedTests = results.filter(
        (r: TestExecutionResult) => r.passed
      ).length;
      const totalTests = results.length;

      return {
        passed: passedTests === totalTests,
        totalTests,
        passedTests,
        output: this.formatTestResults(results),
      };
    } catch (error) {
      return {
        passed: false,
        totalTests: problem.tests.length,
        passedTests: 0,
        error: error instanceof Error ? error.message : "Execution error",
      };
    }
  }

  private static executePython(code: string, problem: Problem): TestResult {
    // For MVP, we'll simulate Python execution
    // In production, this would use Pyodide or a server-side execution
    return {
      passed: false,
      totalTests: problem.tests.length,
      passedTests: 0,
      error:
        "Python execution not yet implemented. Please select JavaScript for now.",
    };
  }

  private static executeRust(code: string, problem: Problem): TestResult {
    // For MVP, we'll simulate Rust execution
    // In production, this would use WASM compilation
    return {
      passed: false,
      totalTests: problem.tests.length,
      passedTests: 0,
      error:
        "Rust execution not yet implemented. Please select JavaScript for now.",
    };
  }

  private static formatTestResults(results: TestExecutionResult[]): string {
    return results
      .map((result, index) => {
        if (result.passed) {
          return `✅ Test ${index + 1}: PASSED`;
        } else if (result.error) {
          return `❌ Test ${index + 1}: ERROR - ${result.error}`;
        } else {
          return `❌ Test ${index + 1}: FAILED - Expected ${JSON.stringify(
            result.expected
          )}, got ${JSON.stringify(result.actual)}`;
        }
      })
      .join("\n");
  }

  static validateCode(
    code: string,
    language: ProgrammingLanguage
  ): { valid: boolean; error?: string } {
    if (!code.trim()) {
      return { valid: false, error: "Code cannot be empty" };
    }

    switch (language) {
      case "javascript":
        return this.validateJavaScript(code);
      case "python":
        return this.validatePython(code);
      case "rust":
        return this.validateRust(code);
      default:
        return { valid: false, error: "Unsupported language" };
    }
  }

  private static validateJavaScript(code: string): {
    valid: boolean;
    error?: string;
  } {
    try {
      // Basic syntax check - create a test function to validate
      const testCode = `
        ${code}
        if (typeof solution !== 'function') {
          throw new Error('solution must be a function');
        }
      `;
      new Function(testCode);

      // Check if solution function is defined
      if (
        !code.includes("function solution") &&
        !code.includes("const solution") &&
        !code.includes("let solution") &&
        !code.includes("solution =")
      ) {
        return { valid: false, error: 'Please define a "solution" function' };
      }

      return { valid: true };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : "Syntax error",
      };
    }
  }

  private static validatePython(code: string): {
    valid: boolean;
    error?: string;
  } {
    if (!code.includes("def solution")) {
      return { valid: false, error: 'Please define a "solution" function' };
    }
    return { valid: true };
  }

  private static validateRust(code: string): {
    valid: boolean;
    error?: string;
  } {
    if (!code.includes("fn solution")) {
      return { valid: false, error: 'Please define a "solution" function' };
    }
    return { valid: true };
  }
}
