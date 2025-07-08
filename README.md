# Code Kata - Daily Programming Practice

매일 알고리즘 문제를 풀며 프로그래밍 실력을 향상시키는 웹 애플리케이션입니다.

## 🚀 기능

- **일일 문제**: 매일 새로운 알고리즘 문제 제공
- **다양한 언어 지원**: JavaScript, Python, Rust 지원 (확장 가능)
- **즉시 피드백**: 브라우저에서 코드 실행 및 테스트
- **진도 추적**: LocalStorage를 통한 학습 진도 저장
- **적응형 난이도**: Day가 증가할수록 점진적으로 어려워지는 문제
- **다크 모드 UI**: Shadcn-ui 기반의 모던한 인터페이스

## 🛠️ 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: Shadcn-ui, Tailwind CSS
- **Code Editor**: CodeMirror
- **AI**: Google Gemini AI (문제 생성)
- **Storage**: LocalStorage

## 📦 설치 및 실행

1. 프로젝트 클론

```bash
git clone <repository-url>
cd code-kata
```

2. 의존성 설치

```bash
npm install
```

3. 환경 변수 설정 (선택사항)

```bash
cp .env.example .env.local
# .env.local 파일에서 Gemini API 키 설정
```

4. 개발 서버 실행

```bash
npm run dev
```

5. 브라우저에서 `http://localhost:3000` 접속

## 🎯 사용법

1. **언어 선택**: 첫 방문시 학습할 프로그래밍 언어를 선택합니다.
2. **문제 해결**: 제시된 문제를 읽고 코드 에디터에서 해결책을 작성합니다.
3. **테스트 실행**: "Run Tests" 버튼을 클릭해 코드를 검증합니다.
4. **다음 단계**: 모든 테스트를 통과하면 다음 날 문제로 진행됩니다.

## 🔧 환경 변수

```bash
# Gemini AI API 키 (문제 자동 생성용)
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

> **참고**: API 키가 없어도 기본 제공되는 문제들로 애플리케이션을 사용할 수 있습니다.

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
├── components/            # React 컴포넌트
│   ├── ui/               # Shadcn-ui 컴포넌트
│   ├── LanguageSelection.tsx
│   ├── CodingInterface.tsx
│   ├── CodeEditor.tsx
│   ├── ProblemDisplay.tsx
│   ├── TestResultDisplay.tsx
│   └── Celebration.tsx
├── lib/                   # 유틸리티 및 서비스
│   ├── storage.ts        # LocalStorage 관리
│   ├── codeExecution.ts  # 코드 실행 서비스
│   ├── problemGenerator.ts # AI 문제 생성
│   ├── languages.ts      # 언어 설정
│   └── utils.ts          # 공통 유틸리티
└── types/                 # TypeScript 타입 정의
    └── index.ts
```

## 🎮 MVP 기능

현재 구현된 MVP 기능:

- ✅ 언어 선택 (JavaScript, Python, Rust)
- ✅ 기본 문제 세트 제공
- ✅ JavaScript 코드 실행 및 테스트
- ✅ 진도 추적 및 저장
- ✅ 반응형 다크 모드 UI
- ⏳ Python/Rust 실행 (예정)
- ⏳ Gemini AI 문제 생성 (API 키 필요)
- ⏳ WASM 기반 코드 실행 (보안 강화)

## 🚧 향후 계획

- **WASM 통합**: 더 안전하고 빠른 코드 실행
- **서버사이드 실행**: Python, Rust 등 추가 언어 지원
- **문제 난이도 조절**: AI 기반 개인화된 문제 생성
- **성과 추적**: 통계 및 학습 분석
- **소셜 기능**: 진도 공유 및 경쟁

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 라이선스

This project is licensed under the MIT License.

## 🙏 감사

- [Shadcn-ui](https://ui.shadcn.com/) for the beautiful UI components
- [CodeMirror](https://codemirror.net/) for the code editor
- [Google Gemini](https://ai.google.dev/) for AI-powered problem generation
