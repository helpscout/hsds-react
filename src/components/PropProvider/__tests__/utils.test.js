import { getProps, getConfigProps, getConfigPropsFromArray } from '../utils'

let errorSpy
beforeEach(() => {
  errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
})
afterEach(() => {
  errorSpy.mockReset()
  errorSpy.mockRestore()
})

describe('getProps', () => {
  test('Returns object by default', () => {
    expect(getProps()).toEqual({})
  })

  test('Returns props if outerProps is undefined', () => {
    const props = { a: 1 }
    const outerProps = { undefined }

    expect(getProps(props, outerProps)).toEqual(props)
  })

  test('Fires prop function, if defined', () => {
    const props = props => ({ ...props, b: 2 })
    const outerProps = { a: 1 }

    expect(getProps(props, outerProps)).toEqual({
      a: 1,
      b: 2,
    })
  })

  test('Returns falsy, if props is invalid', () => {
    const props = []
    const outerProps = { a: 1 }

    expect(getProps(props, outerProps)).toBeFalsy()
  })

  test('Returns falsy, if props fn is invalid', () => {
    const props = props => []
    const outerProps = { a: 1 }

    expect(getProps(props, outerProps)).toBeFalsy()
  })
})

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

  test('Can retrieve props based on an array getter', () => {
    const config = {
      Button: {
        size: 32,
      },
      Label: {
        name: 'Will',
      },
      Modal: {
        zIndex: 33,
      },
    }

    const props = ['Button', 'Label']

    expect(getConfigProps(config, props)).toEqual({
      Button: {
        size: 32,
      },
      Label: {
        name: 'Will',
      },
    })
  })

  test('Can retrieve props based on a function getter', () => {
    const config = {
      Button: {
        size: 32,
      },
      Label: {
        name: 'Will',
      },
      Modal: {
        zIndex: 33,
      },
    }

    const remapConfigToProps = config => {
      const { Button, Label } = config

      return {
        Button,
        Label,
      }
    }

    expect(getConfigProps(config, remapConfigToProps)).toEqual({
      Button: {
        size: 32,
      },
      Label: {
        name: 'Will',
      },
    })
  })

  test('Can retrieve props based on a object getter', () => {
    const config = {
      Button: {
        size: 32,
      },
      Label: {
        name: 'Will',
      },
      Modal: {
        zIndex: 33,
      },
    }

    const remapConfigToProps = {
      Button: true,
      Label: true,
    }

    expect(getConfigProps(config, remapConfigToProps)).toEqual({
      Button: {
        size: 32,
      },
      Label: {
        name: 'Will',
      },
    })
  })

  test('Can retrieve props based on a object getter, with a false getter key', () => {
    const config = {
      Button: {
        size: 32,
      },
      Label: {
        name: 'Will',
      },
      Modal: {
        zIndex: 33,
      },
    }

    const remapConfigToProps = {
      Button: true,
      Label: true,
      Modal: false,
    }

    expect(getConfigProps(config, remapConfigToProps)).toEqual({
      Button: {
        size: 32,
      },
      Label: {
        name: 'Will',
      },
    })
  })

  test('Returns empty object, if no props are found', () => {
    const config = {
      Button: {
        size: 32,
      },
      Label: {
        name: 'Will',
      },
      Modal: {
        zIndex: 33,
      },
    }

    const props = ['ButtonLabel']

    expect(getConfigProps(config, props)).toEqual({})
  })
})

describe('getConfigPropsFromArray', () => {
  test('Returns an empty object with invalid args', () => {
    expect(getConfigPropsFromArray()).toEqual({})
    expect(getConfigPropsFromArray(1, 2)).toEqual({})
    expect(getConfigPropsFromArray(1, ['key'])).toEqual({})
  })

  test('Returns config, with invalid array arg', () => {
    const config = { one: 'two' }

    expect(getConfigPropsFromArray(config)).toBe(config)
  })

  test('Returns prop, if it exists in the config', () => {
    const config = { one: 'Derek', two: 'Hansel' }

    expect(getConfigPropsFromArray(config, ['one', 'two', 'three'])).toEqual({
      one: 'Derek',
      two: 'Hansel',
    })
  })
})
