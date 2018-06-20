import { enhanceComponentMethod } from '../react'

describe('enhanceComponentMethod', () => {
  test('Does not fire callback, if component is invalid', () => {
    const componentMethodSpy = jest.fn()
    const callbackSpy = jest.fn()

    const component = {
      onClick: componentMethodSpy,
    }
    const callback = callbackSpy

    enhanceComponentMethod(component, 'onClick')(callback)()

    expect(componentMethodSpy).not.toHaveBeenCalled()
    expect(callbackSpy).not.toHaveBeenCalled()
  })

  test('Does not fire callback, if component or method is invalid', () => {
    const callbackSpy = jest.fn()
    const callback = callbackSpy

    enhanceComponentMethod()(callback)()

    expect(callbackSpy).not.toHaveBeenCalled()
  })

  test('Does not fire callback, if methodName does not exist', () => {
    const componentMethodSpy = jest.fn()
    const callbackSpy = jest.fn()

    const component = {
      props: {
        onClick: componentMethodSpy,
      },
    }
    const callback = callbackSpy

    enhanceComponentMethod(component, 'nope')(callbackSpy)()

    expect(componentMethodSpy).not.toHaveBeenCalled()
    expect(callbackSpy).not.toHaveBeenCalled()
  })

  test('Fires callback, if provided', () => {
    const componentMethodSpy = jest.fn()
    const callbackSpy = jest.fn()

    const component = {
      props: {
        onClick: componentMethodSpy,
      },
    }
    const callback = callbackSpy

    enhanceComponentMethod(component, 'onClick')(callback)()

    expect(componentMethodSpy).toHaveBeenCalled()
    expect(callbackSpy).toHaveBeenCalled()
  })

  test('Does not fire callback, if not a valid function', () => {
    const componentMethodSpy = jest.fn()
    const callbackSpy = jest.fn()

    const component = {
      props: {
        onClick: componentMethodSpy,
      },
    }
    const callback = { callback: callbackSpy }

    enhanceComponentMethod(component, 'onClick')(callback)()

    expect(componentMethodSpy).toHaveBeenCalled()
    expect(callbackSpy).not.toHaveBeenCalled()
  })

  test('Fires component method, even without callback', () => {
    const componentMethodSpy = jest.fn()

    const component = {
      props: {
        onClick: componentMethodSpy,
      },
    }

    enhanceComponentMethod(component, 'onClick')()()

    expect(componentMethodSpy).toHaveBeenCalled()
  })

  test('Fires callback, with args', () => {
    const componentMethodSpy = jest.fn()
    const callbackSpy = jest.fn()
    const args = 'blue'

    const component = {
      props: {
        onClick: componentMethodSpy,
      },
    }
    const callback = callbackSpy

    enhanceComponentMethod(component, 'onClick')(callback)(args)

    expect(componentMethodSpy).toHaveBeenCalledWith(args)
    expect(callbackSpy).toHaveBeenCalledWith(args)
  })
})
