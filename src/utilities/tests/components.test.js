import {
  getPropChanges,
  hasPropChanges,
  hasPropChangesExcludingChildren,
  pureComponentShouldUpdate
 } from '../components'

describe('getPropChanges', () => {
  test('Returns an array of prop changes', () => {
    const props = {
      isOpen: false,
      status: true,
      value: 3
    }
    const nextProps = {
      isOpen: true,
      status: true,
      value: 4
    }
    const o = getPropChanges(props, nextProps)

    expect(o).toBeTruthy()
    expect(o.length).toBe(2)
    expect(o).toContain('isOpen')
    expect(o).toContain('value')
  })

  test('Returns an empty array if no prop changes', () => {
    const props = {
      isOpen: false,
      status: true,
      value: 3
    }
    const nextProps = {
      isOpen: false,
      status: true,
      value: 3
    }
    const o = getPropChanges(props, nextProps)

    expect(o).toBeTruthy()
    expect(o.length).toBe(0)
  })
})

describe('hasPropChanges', () => {
  test('Returns true for prop changes', () => {
    const props = {
      isOpen: false,
      status: true,
      value: 3
    }
    const nextProps = {
      isOpen: true,
      status: true,
      value: 4
    }
    const o = hasPropChanges(props, nextProps)

    expect(o).toBeTruthy()
  })

  test('Returns false if no prop changes', () => {
    const props = {
      isOpen: false,
      status: true,
      value: 3
    }
    const nextProps = {
      isOpen: false,
      status: true,
      value: 3
    }
    const o = hasPropChanges(props, nextProps)

    expect(o).toBeFalsy()
  })
})

describe('hasPropChangesExcludingChildren', () => {
  test('Returns true for prop changes', () => {
    const props = {
      isOpen: false,
      status: true,
      children: [1, 2, 3],
      value: 3
    }
    const nextProps = {
      isOpen: true,
      status: true,
      children: [1, 2, 3, 4],
      value: 4
    }
    const o = hasPropChangesExcludingChildren(props, nextProps)

    expect(o).toBeTruthy()
  })

  test('Returns false if no prop changes', () => {
    const props = {
      isOpen: false,
      status: true,
      children: [1, 2, 3],
      value: 3
    }
    const nextProps = {
      isOpen: false,
      status: true,
      children: [1, 2, 3, 4],
      value: 3
    }
    const o = hasPropChangesExcludingChildren(props, nextProps)
    expect(o).toBeFalsy()
  })
})

describe('pureComponentShouldUpdate', () => {
  test('Returns true for prop changes', () => {
    const component = {
      state: {
        on: true
      },
      props: {
        isOpen: false,
        status: true,
        children: [1, 2, 3],
        value: 3
      }
    }
    const nextProps = {
      isOpen: true,
      status: true,
      children: [1, 2, 3, 4],
      value: 4
    }
    const nextState = {
      on: true
    }
    const o = pureComponentShouldUpdate(component, nextProps, nextState)

    expect(o).toBeTruthy()
  })

  test('Returns true for state changes', () => {
    const component = {
      state: {
        on: true
      },
      props: {
        isOpen: false,
        status: true,
        children: [1, 2, 3],
        value: 3
      }
    }
    const nextProps = {
      isOpen: false,
      status: true,
      children: [1, 2, 3],
      value: 3
    }
    const nextState = {
      on: false
    }
    const o = pureComponentShouldUpdate(component, nextProps, nextState)

    expect(o).toBeTruthy()
  })
})
