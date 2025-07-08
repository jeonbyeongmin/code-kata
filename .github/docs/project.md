🎯 프로젝트 개요

## Code Kata

- 매일 알고리즘 한 문제씩 푸는 사이트
- MVP는 회원가입/로그인 없음
- Day 0 부터 시작.
  - LocalStorage에 아무 정보가 없으면 Day 0임. 자신이 연습할 언어를 선택함.
- 난이도는 Day가 커지면서 조금씩 어려워지도록.
- Gemini AI 로 Day에 맞는 문제와 테스트 케이스를 만든다.
  - 테스트 케이스는 유저에게 공개되지 않음.
  - 테스트는 서버에서 돌려서 정답 여부를 유저에게 알려주어야 함.
  - 정답일 경우 Day가 증가하고 다음날 접속했을 때 새로운 문제를 받아야 함.
  - 접속할 때마다 문제가 초기화되지 않도록 문제가 적절히 캐싱되어야 함.
- Shadcn-ui Dark mode로 UI를 만들어야 함

⸻

💡 기술 조건

항목 설명
테스트 복잡도 단순한 함수 수준 (예: fn square(n: i32) -> i32)
튜토리얼 생성 Gemini AI가 과제/설명/테스트 자동 생성
실행 환경 사용자는 브라우저만 사용
실행 속도 즉시 반응하는 게 좋음
보안 사용자 코드를 실행하므로 격리 필요

👉 이 조건이면 WASM 기반 + 미리 컴파일된 테스트 시스템이 적절해요.

⸻

🧩 구성 요소 제안

✅ 1. 튜토리얼 데이터 (Gemini 생성)

Gemini가 다음과 같은 튜토리얼 JSON 구조로 문제를 만들어냄:

{
"title": "숫자 제곱 함수",
"description": "숫자를 입력받아 제곱을 반환하는 함수를 작성하세요.",
"signature": "fn square(n: i32) -> i32",
"tests": [
{"input": 2, "expected": 4},
{"input": -3, "expected": 9}
]
}

⸻

✅ 2. 사용자 입력창 (예: CodeMirror)

pub fn square(n: i32) -> i32 {
n \* n
}

⸻

✅ 3. WASM 실행 구조

Rust 코드를 eval_user_code(code_string)처럼 브라우저에서 실행은 못 하니까,
유저 코드를 우리가 준비한 main.rs에 삽입해서 사전에 WASM으로 컴파일해둬요.

▶ 구조 예시

// lib.rs (고정) #[wasm_bindgen]
pub fn run_tests() -> String {
use user_code::square;

    let mut result = String::new();
    if square(2) == 4 {
        result += "✅ Passed test 1\n";
    } else {
        result += "❌ Failed test 1\n";
    }

    if square(-3) == 9 {
        result += "✅ Passed test 2\n";
    } else {
        result += "❌ Failed test 2\n";
    }

    result

}

→ 이 구조를 사용하면,
• 테스트가 컴파일된 상태로 WASM으로 만들어지고
• JS에서 run_tests()만 호출하면 결과를 얻을 수 있어요

⸻

✅ 4. 실행 흐름 요약 1. Gemini가 description + 테스트 목록 + 함수 시그니처 생성 2. 사용자는 브라우저에서 함수 본문만 작성 3. JS가 해당 코드를 적절히 user_code.rs에 삽입 4. 미리 준비된 main.rs + run_tests()가 호출됨 (WASM) 5. console.log() 또는 DOM에 결과 표시
