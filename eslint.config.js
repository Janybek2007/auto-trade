import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import ts from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
   {
      ignores: ['dist'],
   },
   {
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
         parser,
         ecmaVersion: 'latest',
         sourceType: 'module',
         globals: globals.browser,
      },
      plugins: {
         'react-hooks': reactHooks,
         'react-refresh': reactRefresh,
         '@typescript-eslint': ts,
      },
      rules: {
         ...reactHooks.configs.recommended.rules,
         'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true, allowExportNames: ['clientLoader', 'HydrateFallback'] },
         ],
      },
   },
];
