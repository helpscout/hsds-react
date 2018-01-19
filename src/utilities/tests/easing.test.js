import {
  defaultEasingTiming,
  bounceCubicBezier,
  customCubicBezier,
  cubicBezierCSSProp,
  getEasingTiming
} from '../easing'

describe('cubicBezierCSSProp', () => {
  test('Returns default easing timing for invalid arguments', () => {
    expect(cubicBezierCSSProp()).toBe(defaultEasingTiming)
  })

  test('Returns bezier curve as a CSS Prop', () => {
    expect(cubicBezierCSSProp(customCubicBezier.easeInQuad))
      .toContain(customCubicBezier.easeInQuad)
  })
})

describe('getEasingTiming', () => {
  test('Returns default easing timing for invalid arguments', () => {
    expect(getEasingTiming()).toBe(defaultEasingTiming)
    expect(getEasingTiming(true)).toBe(defaultEasingTiming)
    expect(getEasingTiming({})).toBe(defaultEasingTiming)
  })

  test('Returns default CSS easing props, without bezier curves', () => {
    expect(getEasingTiming('ease')).toBe('ease')
    expect(getEasingTiming('ease-in')).toBe('ease-in')
    expect(getEasingTiming('linear')).toBe('linear')
  })

  test('Returns bezier curves, if exists', () => {
    expect(getEasingTiming('easeInSine'))
      .toContain(customCubicBezier.easeInSine)
  })

  test('Returns (snake-case) bezier curves, if exists', () => {
    expect(getEasingTiming('ease-in-sine'))
      .toContain(customCubicBezier.easeInSine)
  })

  test('Returns custom bezier curves', () => {
    expect(getEasingTiming('bounce')).toContain(bounceCubicBezier)
    expect(getEasingTiming('elastic')).toContain(bounceCubicBezier)
  })
})
