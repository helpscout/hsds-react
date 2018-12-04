import {
  APPS,
  contextConfig,
  getConfigProps,
  getConfigPropsFromArray,
  getGlobal,
  isHSApp,
  isBeacon,
  propProviderAppNamespace,
  propProviderAppNamespaceValue,
  propProviderDataAttr,
  shallowMergeProps,
  setGlobalApp,
} from '../utils'

describe('getConfigProps', () => {
  test('Returns default config object, if no arguments', () => {
    expect(getConfigProps()).toEqual(contextConfig)
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

describe('getGlobal', () => {
  test('Returns default config if invalid argument', () => {
    expect(getGlobal()).toEqual(contextConfig)
    expect(getGlobal(true)).toEqual(contextConfig)
  })

  test('Returns config if valid', () => {
    const config = { a: 1 }
    expect(getGlobal(config)).toEqual(config)
    expect(getGlobal(config)[propProviderAppNamespace]).toBeTruthy()
  })
})

describe('shallowMergeProps', () => {
  test('Safely transforms non-Object props', () => {
    expect(shallowMergeProps()).toEqual({})
    expect(shallowMergeProps(1, 2)).toEqual({})
    expect(shallowMergeProps(() => {}, [])).toEqual({})
  })

  test('Merges props at varying namespaces', () => {
    const props = {
      a: 1,
    }
    const nextProps = {
      b: 2,
    }

    expect(shallowMergeProps(props, nextProps)).toEqual({
      a: 1,
      b: 2,
    })
  })

  test('Merges props at same namespaces', () => {
    const props = {
      a: 1,
    }
    const nextProps = {
      a: 2,
    }

    expect(shallowMergeProps(props, nextProps)).toEqual({
      a: 2,
    })
  })

  test('Merges Object props at same namespaces', () => {
    const props = {
      a: {
        b: 1,
      },
    }
    const nextProps = {
      a: {
        b: 2,
      },
    }

    expect(shallowMergeProps(props, nextProps)).toEqual({
      a: {
        b: 2,
      },
    })
  })

  test('Merges Object props with multiple key values at same namespaces', () => {
    const props = {
      a: {
        b: 1,
        c: 3,
      },
    }
    const nextProps = {
      a: {
        b: 2,
        d: 4,
      },
    }

    expect(shallowMergeProps(props, nextProps)).toEqual({
      a: {
        b: 2,
        c: 3,
        d: 4,
      },
    })
  })

  test('Merges Object props with multiple key values at different namespaces', () => {
    const props = {
      a: {
        b: 1,
        c: 3,
      },
      m: {
        n: 0,
        o: 1,
        p: 2,
      },
      x: {
        y: 0,
      },
    }
    const nextProps = {
      a: {
        b: 2,
        d: 4,
      },
      x: {
        y: 1,
        z: 2,
      },
    }

    expect(shallowMergeProps(props, nextProps)).toEqual({
      a: {
        b: 2,
        c: 3,
        d: 4,
      },
      m: {
        n: 0,
        o: 1,
        p: 2,
      },
      x: {
        y: 1,
        z: 2,
      },
    })
  })
})

describe('setGlobalApp', () => {
  test('Sets the namespace to defaults if no arguments are provided', () => {
    expect(setGlobalApp()).toEqual(contextConfig)
  })

  test('Sets the namespace to defaults argument is invalid', () => {
    expect(setGlobalApp(true)).toEqual(contextConfig)
    expect(setGlobalApp('app')).toEqual(contextConfig)
    expect(setGlobalApp([])).toEqual(contextConfig)
  })

  test('Sets the namespace to defaults argument is empty object', () => {
    expect(setGlobalApp({})).toEqual(contextConfig)
  })

  test('Sets the namespace to for with a config argument', () => {
    expect(
      setGlobalApp(contextConfig, 'new')[propProviderAppNamespace]
    ).toEqual('new')
  })

  test('Sets the namespace to for with an empty object argument', () => {
    expect(setGlobalApp({}, 'new')[propProviderAppNamespace]).toEqual('new')
  })

  test('Sets the namespace default if namespace is not a string', () => {
    expect(setGlobalApp({}, 123)[propProviderAppNamespace]).toEqual(
      propProviderAppNamespaceValue
    )
  })
})

describe('isHSApp', () => {
  test('Returns true if secret prop is hs-app', () => {
    const props = {
      [propProviderDataAttr]: APPS.hsApp,
    }

    expect(isHSApp(props)).toBe(true)
  })

  test('Returns false if secret prop is not hs-app', () => {
    const props = {
      [propProviderDataAttr]: 'nope-app',
    }

    expect(isHSApp(props)).toBe(false)
  })

  test('Returns true if ThemeProvider secret prop is not hs-app', () => {
    const props = {
      [propProviderDataAttr]: 'nope',
      theme: {
        [propProviderDataAttr]: 'hs-app',
      },
    }

    expect(isHSApp(props)).toBe(true)
  })
})

describe('isBeacon', () => {
  test('Returns true if secret prop is beacon', () => {
    const props = {
      [propProviderDataAttr]: APPS.beacon,
    }

    expect(isBeacon(props)).toBe(true)
  })

  test('Returns false if secret prop is not beacon', () => {
    const props = {
      [propProviderDataAttr]: 'nope',
    }

    expect(isBeacon(props)).toBe(false)
  })
})
