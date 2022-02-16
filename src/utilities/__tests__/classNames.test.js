import { BEM, classNames, variantClassNames } from '../classNames'

describe('classNames', () => {
  test('Consolidate arguments into a single string, separated by spaces', () => {
    const o = classNames('a', 'b', 'c')

    expect(o).toBe('a b c')
  })

  test('Remove falsy arguments', () => {
    const falsy = 10 > 100
    const o = classNames('a', 'b', 'c', falsy && 'd')

    expect(o).toBe('a b c')
  })

  test('Remove `true` from final output', () => {
    const o = classNames('a', 'b', true, 'c')

    expect(o).toBe('a b c')
  })

  test('Return a string, even if arguments are numbers', () => {
    const o = classNames(1, 2)

    expect(typeof o).toBe('string')
    expect(o).toBe('1 2')
  })

  test('Returns empty string by default', () => {
    expect(classNames('')).toBe('')
  })
})

describe('BEM', () => {
  test('Sets the className as a block', () => {
    const b = BEM('class')

    expect(b.block).toBe('class')
  })

  test('Plucks the last className to use as block', () => {
    const b = BEM('one two three class')

    expect(b.block).toBe('class')
  })

  test('Can generate an BEM element className', () => {
    const b = BEM('class')

    expect(b.element('el')).toBe('class__el')
    expect(b.e('el')).toBe('class__el')
  })

  test('Can generate an BEM modifier className', () => {
    const b = BEM('class')

    expect(b.modifier('mod')).toBe('class--mod')
    expect(b.m('mod')).toBe('class--mod')
  })
})
