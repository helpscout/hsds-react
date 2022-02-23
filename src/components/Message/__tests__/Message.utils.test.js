import { isWord, textIncludesOnlyEmoji } from '../Message.utils'

describe('textIncludesOnlyEmoji', () => {
  expect(textIncludesOnlyEmoji()).toBeFalsy()
  expect(textIncludesOnlyEmoji([])).toBeFalsy()
  expect(textIncludesOnlyEmoji('')).toBeFalsy()
  expect(textIncludesOnlyEmoji({})).toBeFalsy()
  expect(textIncludesOnlyEmoji('ABC 😘')).toBeFalsy()

  expect(textIncludesOnlyEmoji('🦄 🎂 🚀')).toBeTruthy()
})

describe('isWord', () => {
  test('Returns false for non-words', () => {
    expect(isWord()).toBeFalsy()
    expect(isWord([])).toBeFalsy()
    expect(isWord('')).toBeFalsy()
    expect(isWord({})).toBeFalsy()
    expect(isWord(true)).toBeFalsy()
  })

  test('Returns true for words', () => {
    expect(isWord('w')).toBeTruthy()
    expect(isWord('w o r d')).toBeTruthy()
    expect(isWord(123)).toBeTruthy()
    expect(isWord(0)).toBeTruthy()
  })
})
