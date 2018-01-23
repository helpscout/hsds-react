import { mapAnimationStyles } from '../index'
import animations from '../animations'

test('Returns a react-transition-group appropriate style map', () => {
  const styles = mapAnimationStyles()
  expect(typeof styles).toBe('object')
  expect(typeof styles.entering).toBe('object')
  expect(typeof styles.entered).toBe('object')
  expect(typeof styles.exiting).toBe('object')
  expect(typeof styles.exited).toBe('object')
})

test('Extends styles with provided sequences', () => {
  const sequence = 'fade'
  const fade = animations[sequence]
  const styles = mapAnimationStyles(animations, [sequence])

  expect(styles.entering.opacity).toBe(fade.entering.opacity)
  expect(styles.entered.opacity).toBe(fade.entered.opacity)
  expect(styles.exiting.opacity).toBe(fade.exiting.opacity)
})
