import colors from '../../configs/colors'
import { getColor, getThemeBrandProp } from '../color'

describe('getColor', () => {
  test('Returns currentColor as a default', () => {
    expect(getColor()).toEqual('currentColor')
  })

  test('Can retrieve color values (number)', () => {
    expect(getColor('red', 300)).toEqual(colors.red['300'])
    expect(getColor('yellow', 800)).toEqual(colors.yellow['800'])
    expect(getColor('purple', 400)).toEqual(colors.purple['400'])
    expect(getColor('charcoal', 200)).toEqual(colors.charcoal['200'])
  })

  test('Can retrieve color values (string)', () => {
    expect(getColor('red', '300')).toEqual(colors.red['300'])
    expect(getColor('yellow', '800')).toEqual(colors.yellow['800'])
    expect(getColor('purple', '400')).toEqual(colors.purple['400'])
    expect(getColor('charcoal', '200')).toEqual(colors.charcoal['200'])
  })

  test('Renders default shade of 500', () => {
    expect(getColor('red')).toEqual(colors.red['500'])
    expect(getColor('yellow')).toEqual(colors.yellow['500'])
    expect(getColor('purple')).toEqual(colors.purple['500'])
    expect(getColor('charcoal')).toEqual(colors.charcoal['500'])
  })

  test('Returns currentColor if colors are invalid', () => {
    expect(getColor('nope', 1000)).toEqual('currentColor')
    expect(getColor('wut')).toEqual('currentColor')
    expect(getColor('blue', 99999)).toEqual('currentColor')
  })

  test('Returns nested color', () => {
    expect(getColor('state', 'danger', 'color')).toEqual(
      colors.state.danger.color
    )
    expect(getColor('state', 'success', 'color')).toEqual(
      colors.state.success.color
    )
  })

  test('Can parse dot notation', () => {
    expect(getColor('blue.500')).toEqual(colors.blue['500'])
    expect(getColor('red.200')).toEqual(colors.red['200'])
    expect(getColor('state.danger.color')).toEqual(colors.state.danger.color)
    expect(getColor('state.success.color')).toEqual(colors.state.success.color)
  })

  test('Can fall back to defined defaults', () => {
    expect(getColor('blue')).toEqual(colors.blue.default)
    expect(getColor('red')).toEqual(colors.red.default)
    expect(getColor('border.ui')).toEqual(colors.border.ui.default)
  })
})

describe('getThemeBrandProp', () => {
  test('Returns an empty string for invalid args', () => {
    expect(getThemeBrandProp()).toBe('')
    expect(getThemeBrandProp({})).toBe('')
    expect(getThemeBrandProp({ color: 'red' }, 'nope')).toBe('')
    expect(getThemeBrandProp({ color: 'red' }, 'red')).toBe('')
    expect(getThemeBrandProp({ color: 'red' }, 'color')).toBe('')
  })

  test('Returns prop if defined under theme.brandColor', () => {
    const props = {
      theme: {
        brandColor: {
          thing: 'blue',
        },
      },
    }

    expect(getThemeBrandProp(props, 'thing')).toBe('blue')
  })

  test('Returns nested prop if defined under theme.brandColor', () => {
    const props = {
      theme: {
        brandColor: {
          nest: {
            doubleNest: {
              hallowNest: {
                nail: 'pure',
              },
            },
          },
        },
      },
    }

    expect(getThemeBrandProp(props, 'nest.doubleNest.hallowNest.nail')).toBe(
      'pure'
    )
  })

  test('Returns fallback, if defined', () => {
    const props = {
      theme: {
        brandColor: {
          nest: {
            doubleNest: {
              hallowNest: {
                nail: 'pure',
              },
            },
          },
        },
      },
    }

    expect(getThemeBrandProp(props, 'hallowNest.nail', 'old')).toBe('old')
  })
})
