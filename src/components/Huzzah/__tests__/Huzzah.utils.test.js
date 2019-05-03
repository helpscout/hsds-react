import { getHuzzah } from '../Huzzah.utils'
import HUZZAHS from '../huzzahs'

describe('getHuzzah', () => {
  test('Provides a default fallback huzzah', () => {
    expect(getHuzzah()).toContain(HUZZAHS.donut)
  })

  test('Provides a default fallback huzzah, if name is not defined', () => {
    expect(getHuzzah('wut-no-lol')).toContain(HUZZAHS.donut)
  })

  test('Retrieves huzzah, if defined', () => {
    expect(getHuzzah('rocket')).toContain(HUZZAHS.rocket)
    expect(getHuzzah('rocket')).not.toContain(HUZZAHS.donut)
  })

  test('Retrieves huzzah with hyphen', () => {
    expect(getHuzzah('mic-drop')).toContain(HUZZAHS['mic-drop'])
    expect(getHuzzah('mic-drop')).not.toContain(HUZZAHS.donut)
  })

  test('Handles uppercase letters', () => {
    expect(getHuzzah('RoCKEt')).toContain(HUZZAHS.rocket)
  })
})
