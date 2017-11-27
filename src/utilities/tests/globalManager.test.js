import { setupManager } from '../globalManager'

const defaultNameSpace = 'BlueGlobalManager'

afterEach(() => {
  window.Buddy = undefined
})

describe('Namespace', () => {
  test('Adds a namespace by default', () => {
    setupManager()
    expect(window[`${defaultNameSpace}1`]).toBeTruthy()
  })

  test('Can define a namespace', () => {
    expect(window.Buddy).not.toBeTruthy()
    setupManager('Buddy')
    expect(window.Buddy).toBeTruthy()
  })

  test('Does not override existing global object', () => {
    window.Buddy = { elf: true }
    setupManager('Buddy')

    expect(window.Buddy.elf).toBe(true)
  })
})

describe('Add', () => {
  test('Adds item to manager data', () => {
    const manager = setupManager('Buddy')
    manager.add('sugar')
    manager.add('syrup')

    expect(window.Buddy.length).toBe(2)
    expect(window.Buddy.indexOf('syrup')).toBe(1)
  })
})

describe('Remove', () => {
  test('Removes item from manager data', () => {
    const manager = setupManager('Buddy')
    manager.add('sugar')
    manager.add('syrup')
    manager.remove('syrup')
    expect(window.Buddy.indexOf('syrup')).toBe(-1)
    manager.remove('fake')
    expect(window.Buddy.indexOf('sugar')).toBe(0)
    manager.remove('sugar')
    expect(window.Buddy.indexOf('sugar')).toBe(-1)
  })
})

describe('First', () => {
  test('Returns first item', () => {
    const manager = setupManager('Buddy')
    manager.add('sugar')
    manager.add('syrup')

    expect(manager.first()).toBe('sugar')
  })
})

describe('Last', () => {
  test('Returns last item', () => {
    const manager = setupManager('Buddy')
    manager.add('sugar')
    manager.add('syrup')

    expect(manager.last()).toBe('syrup')
  })
})

describe('Data', () => {
  test('Returns managed data', () => {
    const manager = setupManager('Buddy')
    manager.add('sugar')
    manager.add('syrup')

    expect(manager.data.length).toBe(2)
    expect(manager.data.indexOf('syrup')).toBe(1)
  })
})
