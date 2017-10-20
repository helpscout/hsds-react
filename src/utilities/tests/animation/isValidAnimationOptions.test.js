import { isValidAnimationOptions } from '../../animation'

test('Returns false for invalid options', () => {
  const args = [
    '',
    1,
    [],
    true,
    false,
    {},
    {
      sequences: true,
      sequence: true,
      animationState: true
    },
    {
      sequences: true,
      sequence: true,
      animationState: 'entering'
    },
    {
      sequences: [],
      sequence: true,
      animationState: 'entering'
    }
  ]

  args.forEach((arg) => {
    expect(isValidAnimationOptions(arg)).toBeFalsy()
  })
})

test('Returns true for valid options', () => {
  const o = isValidAnimationOptions({
    animations: {fade: {onEnter: {opacity: 0}}},
    sequences: ['fade'],
    animationState: 'onEnter'
  })

  expect(o).toBeTruthy()
})

test('Returns true additional keys', () => {
  const o = isValidAnimationOptions({
    animations: {fade: {onEnter: {opacity: 0}}},
    sequences: ['fade'],
    animationState: 'onEnter',
    sequence: true
  })

  expect(o).toBeTruthy()
})
