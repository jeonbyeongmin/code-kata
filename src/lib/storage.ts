import { UserProgress, Problem, ProgrammingLanguage } from "@/types";

const STORAGE_KEYS = {
  USER_PROGRESS: "code_kata_user_progress",
  CURRENT_PROBLEM: "code_kata_current_problem",
  USER_CODE: "code_kata_user_code",
} as const;

export class LocalStorageService {
  static getUserProgress(): UserProgress | null {
    if (typeof window === "undefined") return null;

    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  static saveUserProgress(progress: UserProgress): void {
    if (typeof window === "undefined") return;

    localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
  }

  static initializeUser(language: ProgrammingLanguage): UserProgress {
    const progress: UserProgress = {
      currentDay: 0,
      language,
      completedProblems: [],
      lastAccessDate: new Date().toISOString(),
    };

    this.saveUserProgress(progress);
    return progress;
  }

  static getCurrentProblem(): Problem | null {
    if (typeof window === "undefined") return null;

    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_PROBLEM);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  static saveCurrentProblem(problem: Problem): void {
    if (typeof window === "undefined") return;

    localStorage.setItem(STORAGE_KEYS.CURRENT_PROBLEM, JSON.stringify(problem));
  }

  static getUserCode(problemId: string): string | null {
    if (typeof window === "undefined") return null;

    try {
      const data = localStorage.getItem(
        `${STORAGE_KEYS.USER_CODE}_${problemId}`
      );
      return data || null;
    } catch {
      return null;
    }
  }

  static saveUserCode(problemId: string, code: string): void {
    if (typeof window === "undefined") return;

    localStorage.setItem(`${STORAGE_KEYS.USER_CODE}_${problemId}`, code);
  }

  static completeProblem(problemId: string): void {
    const progress = this.getUserProgress();
    if (!progress) return;

    progress.completedProblems.push(problemId);
    progress.currentDay += 1;
    progress.lastAccessDate = new Date().toISOString();

    this.saveUserProgress(progress);
  }

  static shouldGenerateNewProblem(): boolean {
    const progress = this.getUserProgress();
    if (!progress) return true;

    const lastAccess = new Date(progress.lastAccessDate);
    const today = new Date();

    // 날짜가 바뀌었거나 현재 문제가 없으면 새 문제 생성
    return (
      lastAccess.toDateString() !== today.toDateString() ||
      !this.getCurrentProblem()
    );
  }

  static clearAll(): void {
    if (typeof window === "undefined") return;

    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });

    // 사용자 코드 관련 키들도 삭제
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(STORAGE_KEYS.USER_CODE)) {
        localStorage.removeItem(key);
      }
    }
  }
}
