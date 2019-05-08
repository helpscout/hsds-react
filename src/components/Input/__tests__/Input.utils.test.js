import {
  getTextAreaLineCurrent,
  getTextAreaLineTotal,
  isTextArea,
  moveCursorToEnd,
} from '../Input.utils'

describe('moveCursorToEnd', () => {
  test('Returns undefined if no node provided', () => {
    expect(moveCursorToEnd()).toBeUndefined()
  })

  test('Moves cursor to end', () => {
    const input = document.createElement('input')
    input.value = 'stephen pomegranate'
    moveCursorToEnd(input)

    expect(input.selectionStart).toBe(19)
  })
})

describe('getTextAreaLineCurrent', () => {
  test('Retrieves the correct line number for a single line', () => {
    const textarea = document.createElement('textarea')
    textarea.value = 'stephen pomegranate'
    expect(getTextAreaLineCurrent(textarea)).toBe(1)
  })

  test('Retrieves the correct line number for a multiple lines', () => {
    const textarea = document.createElement('textarea')
    textarea.value = 'stephen\npomegranate'

    textarea.selectionStart = 10
    expect(getTextAreaLineCurrent(textarea)).toBe(2)

    textarea.selectionStart = 1
    expect(getTextAreaLineCurrent(textarea)).toBe(1)
  })

  test('Returns 0 if textarea is not defined', () => {
    expect(getTextAreaLineCurrent()).toBe(0)
  })
})

describe('getTextAreaLineTotal', () => {
  test('Retrieves the correct total line number for a single line', () => {
    const textarea = document.createElement('textarea')
    textarea.value = 'stephen pomegranate'
    expect(getTextAreaLineTotal(textarea)).toBe(1)
  })

  test('Retrieves the correct total line number for a multiple lines', () => {
    const textarea = document.createElement('textarea')
    textarea.value = 'stephen\npomegranate'

    expect(getTextAreaLineTotal(textarea)).toBe(2)
  })

  test('Retrieves the correct total line number for a multiple lines, regardless of cursor position', () => {
    const textarea = document.createElement('textarea')
    textarea.value = 'stephen\npomegranate'
    textarea.selectionStart = 1

    expect(getTextAreaLineTotal(textarea)).toBe(2)
  })

  test('Returns 0 if textarea is not defined', () => {
    expect(getTextAreaLineTotal()).toBe(0)
  })
})

describe('isTextArea', () => {
  test('Returns true for textarea node', () => {
    const node = document.createElement('textarea')

    expect(isTextArea(node)).toBe(true)
  })

  test('Returns false for non textarea node', () => {
    const node = document.createElement('input')

    expect(isTextArea()).toBe(false)
    expect(isTextArea(node)).toBe(false)
  })
})
