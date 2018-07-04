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

describe('variantClassNames', () => {
  test('Returns empty string by default', () => {
    expect(variantClassNames()).toBe('')
  })

  test('Returns empty string if first argument is invalid', () => {
    expect(variantClassNames('', 'sm')).toBe('')
    expect(variantClassNames(154, 'sm')).toBe('')
    expect(variantClassNames(['className'], 'sm')).toBe('')
    expect(variantClassNames(true, 'sm')).toBe('')
  })

  test('Combines className with variant, separated by hyphen', () => {
    expect(variantClassNames('ron', 'b')).toBe('ron-b')
  })

  test('Combines className + hyphens with variant, separated by hyphen', () => {
    expect(variantClassNames('ron---', 'b')).toBe('ron----b')
  })

  test('Combines className + hyphens + underscore with variant, separated by hyphen', () => {
    expect(variantClassNames('rons_epic-jazz--', 'flute')).toBe(
      'rons_epic-jazz---flute'
    )
  })

  describe('Variations', () => {
    test('Returns className if variant argument is invalid', () => {
      expect(variantClassNames('a', 1)).toBe('a')
      expect(variantClassNames('a', true)).toBe('a')
      expect(variantClassNames('a', [1, 2, 3])).toBe('a')
      expect(variantClassNames('a', ['1', '2', '3'])).toBe('a')
    })

    test('Generates className for every variant, separated by a single space', () => {
      expect(variantClassNames('a', '1 2 3')).toBe('a-1 a-2 a-3')
    })

    test('Generates className for every variant, separated by comma', () => {
      expect(variantClassNames('a', '1, 2, 3')).toBe('a-1 a-2 a-3')
    })

    test('Generates className for every variant, separated by comma + space mixture', () => {
      expect(variantClassNames('a', '1,2        3')).toBe('a-1 a-2 a-3')
    })

    test('Generates className + hyphen for every variant, separated by comma + space mixture', () => {
      expect(variantClassNames('a-', '1,2        3')).toBe('a--1 a--2 a--3')
    })
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
