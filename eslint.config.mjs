import nextPlugin from '@next/eslint-plugin-next';
import js from '@eslint/js';

export default [
  {
    plugins: {
      '@next/next': nextPlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
    settings: {
      next: {
        rootDir: ['app/*/']
      }
    },
    ignorePatterns: ['.next', 'node_modules']
  }
];
