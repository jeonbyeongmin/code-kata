import { ProgrammingLanguage, LanguageConfig } from "@/types";

export const LANGUAGE_CONFIGS: Record<ProgrammingLanguage, LanguageConfig> = {
  rust: {
    name: "Rust",
    fileExtension: "rs",
    starterTemplate: `fn solution() {
    // Your code here
}`,
    testTemplate: `#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_solution() {
        // Test cases will be generated here
    }
}`,
  },
  javascript: {
    name: "JavaScript",
    fileExtension: "js",
    starterTemplate: `function solution() {
    // Your code here
}`,
    testTemplate: `// Test cases will be generated here`,
  },
  python: {
    name: "Python",
    fileExtension: "py",
    starterTemplate: `def solution():
    # Your code here
    pass`,
    testTemplate: `# Test cases will be generated here`,
  },
};

export const SUPPORTED_LANGUAGES: ProgrammingLanguage[] = [
  "rust",
  "javascript",
  "python",
];
