// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

// расширяем конфиг ESLint от Nuxt
export default withNuxt({
  rules: {
    'vue/no-multiple-template-root': 'off', // разрешаем несколько корневых элементов в шаблоне
    'vue/max-attributes-per-line': ['error', { singleline: 3 }] // максимум 3 атрибута в одной строке для singleline
  }
})
