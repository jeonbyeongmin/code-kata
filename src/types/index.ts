export interface TestCase {
  input: unknown;
  expected: unknown;
}

export interface Problem {
  id: string;
  day: number;
  title: string;
  description: string;
  signature: string;
  language: ProgrammingLanguage;
  tests: TestCase[];
  starterCode?: string;
}

export interface UserProgress {
  currentDay: number;
  language: ProgrammingLanguage;
  completedProblems: string[];
  lastAccessDate: string;
}

export type ProgrammingLanguage = "rust" | "javascript" | "python";

export interface TestResult {
  passed: boolean;
  totalTests: number;
  passedTests: number;
  error?: string;
  output?: string;
}

export interface LanguageConfig {
  name: string;
  fileExtension: string;
  starterTemplate: string;
  testTemplate: string;
}
