import { getConfigProps } from '../utils'

describe('getConfigProps', () => {
  test('Returns an empty object, if no arguments', () => {
    expect(getConfigProps()).toEqual({})
  })

  test('Returns props from a config, if available', () => {
    const config = {
      Button: {
        size: 32,
      },
    }
    expect(getConfigProps(config, 'Button')).toEqual(config.Button)
  })

  test('Returns an empty object if the namespace is not defined', () => {
    const config = {
      Button: {
        size: 32,
      },
    }
    expect(getConfigProps(config, 'Nope')).toEqual({})
  })
})
