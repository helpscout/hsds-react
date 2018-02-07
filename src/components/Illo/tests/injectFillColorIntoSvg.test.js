import {injectFillColorIntoSvg} from '../index'

test('Returns empty string if invalid arguments', () => {
  expect(injectFillColorIntoSvg()).toBe('')
  expect(injectFillColorIntoSvg('')).toBe('')
  expect(injectFillColorIntoSvg(true)).toBe('')
  expect(injectFillColorIntoSvg([])).toBe('')
  expect(injectFillColorIntoSvg({})).toBe('')
})

describe('replace', () => {
  test('Replaces prop color with color name', () => {
    const markup = `
      <svg><path data-path-primary=""></path></svg>
    `
    const props = {
      primary: 'red'
    }

    expect(injectFillColorIntoSvg(markup, props)).toContain('style')
    expect(injectFillColorIntoSvg(markup, props)).toContain('fill')
    expect(injectFillColorIntoSvg(markup, props)).toContain(props.primary)
  })

  test('Replaces prop color with hex', () => {
    const markup = `
      <svg><path data-path-primary=""></path></svg>
    `
    const props = {
      primary: '#ff9900'
    }

    expect(injectFillColorIntoSvg(markup, props)).toContain('style')
    expect(injectFillColorIntoSvg(markup, props)).toContain('fill')
    expect(injectFillColorIntoSvg(markup, props)).toContain(props.primary)
  })

  test('Replaces prop color with rgb', () => {
    const markup = `
      <svg><path data-path-primary=""></path></svg>
    `
    const props = {
      primary: 'rgb(0,0,0)'
    }

    expect(injectFillColorIntoSvg(markup, props)).toContain('style')
    expect(injectFillColorIntoSvg(markup, props)).toContain('fill')
    expect(injectFillColorIntoSvg(markup, props)).toContain(props.primary)
  })

  test('Replaces prop color with rgba', () => {
    const markup = `
      <svg><path data-path-primary=""></path></svg>
    `
    const props = {
      primary: 'rgba(0,0,0)'
    }

    expect(injectFillColorIntoSvg(markup, props)).toContain('style')
    expect(injectFillColorIntoSvg(markup, props)).toContain('fill')
    expect(injectFillColorIntoSvg(markup, props)).toContain(props.primary)
  })
})

describe('color', () => {
  test('Injects specified color', () => {
    const markup = `
      <svg>
        <path data-path-primary=""></path>
        <path data-path-secondary=""></path>
        <path data-path-ui=""></path>
        <path data-path-uiDark=""></path>
        <path data-path-uiLight=""></path>
        <path data-path-uiTransparent=""></path>
        <path data-path-uiWhite=""></path>
      </svg>
    `
    const props = {
      primary: 'red',
      secondary: 'blue',
      ui: 'green',
      uiDark: 'purple',
      uiLight: 'yellow',
      uiTransparent: 'black',
      uiWhite: 'white'
    }

    expect(injectFillColorIntoSvg(markup, props)).toContain('style')
    expect(injectFillColorIntoSvg(markup, props)).toContain('fill')
    expect(injectFillColorIntoSvg(markup, props)).toContain(props.primary)
    expect(injectFillColorIntoSvg(markup, props)).toContain(props.secondary)
    expect(injectFillColorIntoSvg(markup, props)).toContain(props.ui)
    expect(injectFillColorIntoSvg(markup, props)).toContain(props.uiDark)
    expect(injectFillColorIntoSvg(markup, props)).toContain(props.uiLight)
    expect(injectFillColorIntoSvg(markup, props)).toContain(props.uiTransparent)
    expect(injectFillColorIntoSvg(markup, props)).toContain(props.uiWhite)
  })
})
