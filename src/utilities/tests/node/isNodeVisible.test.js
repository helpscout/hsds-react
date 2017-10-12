import {
  isNodeVisible
} from '../../node'

test('Returns false for invalid arguments', () => {
  const o = document.createElement('div')

  expect(isNodeVisible()).toBeFalsy()
  expect(isNodeVisible(true)).toBeFalsy()
  expect(isNodeVisible(o)).toBeFalsy()
  expect(isNodeVisible({})).toBeFalsy()
})

test('Returns true if Node is visible', () => {
  const scope = document.createElement('div')
  const node = document.createElement('div')

  scope.getBoundingClientRect = () => ({
    height: 300
  })
  node.getBoundingClientRect = () => ({
    height: 10,
    top: 400
  })
  scope.scrollTop = 400

  const options = {
    node,
    scope
  }

  expect(isNodeVisible(options)).toBeTruthy()
})

test('Returns false if Node is not visible', () => {
  const scope = document.createElement('div')
  const node = document.createElement('div')

  scope.getBoundingClientRect = () => ({
    height: 300
  })
  node.getBoundingClientRect = () => ({
    height: 10,
    top: 400
  })
  scope.scrollTop = 0

  const options = {
    node,
    scope
  }

  expect(isNodeVisible(options)).not.toBeTruthy()
})

describe('Window', () => {
  test('Returns true if Node is visible within window', () => {
    const node = document.createElement('div')

    node.getBoundingClientRect = () => ({
      height: 10,
      top: 400
    })

    window.scrollY = 400

    const options = {
      node,
      window
    }

    expect(isNodeVisible(options)).toBeTruthy()
  })

  test('Returns false if Node is not visible within window', () => {
    const node = document.createElement('div')

    node.getBoundingClientRect = () => ({
      height: 10,
      top: 400
    })

    window.scrollY = 0

    const options = {
      node,
      window
    }

    expect(isNodeVisible(options)).toBeTruthy()
  })
})

describe('Offset', () => {
  test('Can account for offset', () => {
    const scope = document.createElement('div')
    const node = document.createElement('div')

    scope.getBoundingClientRect = () => ({
      height: 300
    })
    node.getBoundingClientRect = () => ({
      height: 10,
      top: 400
    })
    scope.scrollTop = 300

    const options = {
      node,
      scope,
      offset: 100
    }

    expect(isNodeVisible(options)).toBeTruthy()
  })

  test('Can account for non-number offset', () => {
    const scope = document.createElement('div')
    const node = document.createElement('div')

    scope.getBoundingClientRect = () => ({
      height: 300
    })
    node.getBoundingClientRect = () => ({
      height: 10,
      top: 400
    })
    scope.scrollTop = 400

    const options = {
      node,
      scope,
      offset: 'derlict'
    }

    expect(isNodeVisible(options)).toBeTruthy()
  })

  test('Can account for 0 offset', () => {
    const scope = document.createElement('div')
    const node = document.createElement('div')

    scope.getBoundingClientRect = () => ({
      height: 100
    })
    node.getBoundingClientRect = () => ({
      height: 10,
      top: 400
    })
    scope.scrollTop = 10

    const options = {
      node,
      scope,
      offset: 0
    }

    expect(isNodeVisible(options)).not.toBeTruthy()
  })

  test('Can normalize negative offset to 0', () => {
    const scope = document.createElement('div')
    const node = document.createElement('div')

    scope.getBoundingClientRect = () => ({
      height: 100
    })
    node.getBoundingClientRect = () => ({
      height: 10,
      top: 400
    })
    scope.scrollTop = 10

    const options = {
      node,
      scope,
      offset: -100000
    }

    expect(isNodeVisible(options)).not.toBeTruthy()
  })
})

describe('Complete', () => {
  test('Returns true when node is completely in view', () => {
    const scope = document.createElement('div')
    const node = document.createElement('div')

    scope.getBoundingClientRect = () => ({
      height: 300
    })
    node.getBoundingClientRect = () => ({
      height: 10,
      top: 300
    })
    scope.scrollTop = 200

    const options = {
      node,
      scope,
      offset: 0,
      complete: true
    }

    expect(isNodeVisible(options)).toBeTruthy()
  })

  test('Returns false when node is completely in view', () => {
    const scope = document.createElement('div')
    const node = document.createElement('div')

    scope.getBoundingClientRect = () => ({
      height: 400
    })
    node.getBoundingClientRect = () => ({
      height: 10,
      top: 500
    })
    scope.scrollTop = 10

    const options = {
      node,
      scope,
      offset: 0,
      complete: true
    }

    expect(isNodeVisible(options)).not.toBeTruthy()
  })

  test('Offset is prioritized over complete', () => {
    const scope = document.createElement('div')
    const node = document.createElement('div')

    scope.getBoundingClientRect = () => ({
      height: 300
    })
    node.getBoundingClientRect = () => ({
      height: 10,
      top: 400
    })
    scope.scrollTop = 300

    const options = {
      node,
      scope,
      offset: 100,
      complete: true
    }

    expect(isNodeVisible(options)).toBeTruthy()
  })
})
