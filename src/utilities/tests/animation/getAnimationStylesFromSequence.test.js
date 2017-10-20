import { getAnimationStylesFromSequence } from '../../animation'
import AnimationStates from '../../../constants/AnimationStates'
import animations from '../../../components/Animate/animations'

const node = document.createElement('div')

describe('Sequence', () => {
  test('Returns empty object if sequence (arg) is not valid', () => {
    const options = {
      animations,
      node
    }

    expect(getAnimationStylesFromSequence(options)).toEqual({})
    expect(
      getAnimationStylesFromSequence(
        Object.assign({}, options, {
          sequence: 'noppppppppe'
        })
      )
    ).toEqual({})
  })

  test('Returns a valid sequence object', () => {
    const options = {
      animations,
      animationState: AnimationStates.ENTER,
      node,
      sequence: {
        onEnter: {
          opacity: [0, 1]
        }
      }
    }
    const o = getAnimationStylesFromSequence(options)

    expect(o.opacity).toBe(options.sequence.onEnter.opacity)
    expect(o.easing).toBeTruthy()
  })

  test('Returns a valid sequence object, with functional states', () => {
    const el = document.createElement('div')
    el.setAttribute('data-height', 100)
    const options = {
      animations,
      animationState: AnimationStates.ENTER,
      node: el,
      sequence: {
        onEnter: (node) => ({
          height: node.getAttribute('data-height')
        })
      }
    }
    const o = getAnimationStylesFromSequence(options)

    expect(o.height).toBe('100')
  })
})

describe('Easing', () => {
  test('Sets easing to linear if opacity key exists and easing is not defined', () => {
    const options = {
      animations,
      animationState: AnimationStates.ENTER,
      node,
      sequence: {
        onEnter: {
          opacity: [0, 1]
        }
      }
    }
    const o = getAnimationStylesFromSequence(options)

    expect(o.easing).toBe('linear')
  })

  test('Default sets easing to easeInOutBack, if not defined', () => {
    const options = {
      animations,
      animationState: AnimationStates.ENTER,
      node,
      sequence: {
        onEnter: {
          height: [0, 1]
        }
      }
    }
    const o = getAnimationStylesFromSequence(options)

    expect(o.easing).toBe('easeInOutBack')
  })

  test('Does not set easing, if easing is defined', () => {
    const options = {
      animations,
      animationState: AnimationStates.ENTER,
      node,
      sequence: {
        onEnter: {
          easing: 'elastic',
          height: [0, 1]
        }
      }
    }
    const o = getAnimationStylesFromSequence(options)

    expect(o.easing).toBe('elastic')
  })
})
