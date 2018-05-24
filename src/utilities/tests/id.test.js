import { createUniqueIDFactory, createUniqueIndexFactory } from '../id'

describe('createUniqueIDFactory', () => {
  test('Generates an numerical ID (string), without arguments', () => {
    const uid = createUniqueIDFactory()

    expect(uid()).toBe('1')
  })

  test('Generates an ID num with prefix', () => {
    const uid = createUniqueIDFactory('prefix')

    expect(uid()).toBe('prefix1')
  })

  test('Auto-increments ID num on every call', () => {
    const uid = createUniqueIDFactory('prefix')
    uid() // 1
    uid() // 2
    uid() // 3
    uid() // 4
    // Next call should be 5
    expect(uid()).toBe('prefix5')
  })
})

describe('createUniqueIndexFactory', () => {
  test('Defaults to 1 if argument is invalid', () => {
    const ui = createUniqueIndexFactory('index')

    expect(ui()).toBe(1)
  })

  test('Generates an numerical ID (number), without arguments', () => {
    const ui = createUniqueIndexFactory()

    expect(ui()).toBe(1)
  })

  test('Auto-increments ID num on every call', () => {
    const ui = createUniqueIndexFactory()
    ui() // 1
    ui() // 2
    ui() // 3
    ui() // 4
    ui() // 5

    expect(ui()).toBe(6)
  })

  test('Generates an index based on a start number', () => {
    const ui = createUniqueIndexFactory(100)

    expect(ui()).toBe(100)
  })

  test('Auto-increments ID based on a start number', () => {
    const ui = createUniqueIndexFactory(100)
    ui() // 100
    ui() // 101
    ui() // 102
    ui() // 103
    ui() // 104
    ui() // 105

    expect(ui()).toBe(106)
  })
})
