import { getHuzzah, DEFAULT_HUZZAH } from '../index'

describe('getHuzzah', () => {
  test('Provides a default fallback huzzah', () => {
    expect(getHuzzah()).toContain(DEFAULT_HUZZAH)
  })

  test('Provides a default fallback huzzah, if name is not defined', () => {
    expect(getHuzzah('wut-no-lol')).toContain(DEFAULT_HUZZAH)
  })

  test('Retrieves huzzah, if defined', () => {
    expect(getHuzzah('rocket')).toContain('rocket')
    expect(getHuzzah('rocket')).not.toContain(DEFAULT_HUZZAH)
  })

  test('Retrieves huzzah with hyphen', () => {
    expect(getHuzzah('mic-drop')).toContain('mic-drop')
    expect(getHuzzah('mic-drop')).not.toContain(DEFAULT_HUZZAH)
  })

  test('Handles uppercase letters', () => {
    expect(getHuzzah('RoCKEt')).toContain('rocket')
  })
})
