# 미니게임 좌우좌우 입니다.

<img src="./src/assets/tutorialLeftRight.png" alt="game-tutorial" />

## 리펙토링 작업 진행도

- [x] 기본 UI
  - [ ] ui 퍼센트 비율로 배치되게
- [x] 게임 시작 카운트다운
  - [ ] 카운트다운 중도 초기화 기능 (clear)
  - [ ] 카운트다운 리펙토링 (지금은 불필요한 코드가 계속 실행되고 있음)
  - [ ] 배치 퍼센트 비율
- [x] 게임 시작 튜토리얼
- [x] 게임 타이머
  - [ ] 타이머 시간 조절 기능
- [ ] 게임 진행
  - [x] 몬스터
  - [ ] 점수
  - [x] 좌우좌우 클릭 이벤트
- [x] 게임 종료 애니메이션
- [ ] 게임 종료 완료 화면
  - [ ] 스코어 보드 등 (localstorage)



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

