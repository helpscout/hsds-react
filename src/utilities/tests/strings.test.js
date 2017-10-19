import { isWord, nameToInitials, wordHasSpaces } from '../strings'

describe('nameToInitials', () => {
  test('Returns empty string if no args are passed', () => {
    expect(nameToInitials()).toBe('')
  })
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

describe('wordHasSpaces', () => {
  test('Returns false for non-words', () => {
    expect(wordHasSpaces()).toBeFalsy()
    expect(wordHasSpaces([])).toBeFalsy()
    expect(wordHasSpaces('')).toBeFalsy()
    expect(wordHasSpaces({})).toBeFalsy()
    expect(wordHasSpaces(true)).toBeFalsy()
    expect(wordHasSpaces(123)).toBeFalsy()
    expect(wordHasSpaces('word')).toBeFalsy()
    expect(wordHasSpaces('super-long-word_with_hyphen(underscore)')).toBeFalsy()
    expect(wordHasSpaces(' starts-with-space')).toBeFalsy()
  })

  test('Returns true for words with spaces', () => {
    expect(wordHasSpaces('super longworddddddddd')).toBeTruthy()
    expect(wordHasSpaces(' super longworddddddddd')).toBeTruthy()
  })
})
