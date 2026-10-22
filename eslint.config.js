import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettier from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist', 'shots', 'node_modules', 'pnpm-lock.yaml']),

  // 配置文件与脚本（Node 环境）
  {
    files: ['**/*.{js,mjs}'],
    extends: [js.configs.recommended, prettier],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: globals.node,
    },
  },

  // 应用代码（浏览器环境）
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat['recommended-latest'],
      reactRefresh.configs.vite,
      // 必须放最后：关掉与 Prettier 冲突的格式类规则
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // 入口与路由表只导出配置对象，不参与 Fast Refresh
  {
    files: ['src/main.tsx', 'src/app/router.tsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
])
