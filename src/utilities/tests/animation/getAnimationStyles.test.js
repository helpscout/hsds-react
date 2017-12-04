import { getAnimationStyles } from '../../animation'
import AnimationStates from '../../../constants/AnimationStates'
import animations from '../../../components/Animate/animations'

test('Returns empty object for invalid argument', () => {
  const args = [
    {
      animations: {fade: {onEnter: {opacity: 0}}},
      sequences: true,
      animationState: 'onEnter'
    }
  ]

  args.forEach((arg) => {
    const o = getAnimationStyles(arg)

    expect(typeof o).toBe('object')
    expect(Object.keys(o).length).toBe(0)
  })
})

test('Returns styles object for valid argument', () => {
  const animationState = AnimationStates.ENTERING
  const options = {
    animations,
    animationState,
    sequences: ['scale', 'up']
  }
  const o = getAnimationStyles(options)

  expect(o.easing).toBeTruthy()
  expect(o.scale).toBe(animations.scale[animationState].scale)
  expect(o.translateY).toBe(animations.up[animationState].translateY)
})
