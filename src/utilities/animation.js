export const getSequenceNames = (sequence) => {
  return Array.isArray(sequence) ? sequence
    : typeof sequence === 'string' && sequence.length ? sequence.split(' ') : []
}

export const isValidAnimationOptions = (options) => {
  if (typeof options !== 'object') return false
  const { animations, animationState } = options

  return (
    typeof animations === 'object' &&
    typeof animationState === 'string'
  )
}

export const setEasing = (sequence) => {
  const defaultEasing = 'easeInOutBack'
  const defaultOpacityEasing = 'linear'
  if (typeof sequence !== 'object') return defaultEasing

  return sequence['easing'] ? sequence.easing
    : sequence['opacity'] !== undefined ? defaultOpacityEasing
    : defaultEasing
}

export const getAnimationStylesFromSequence = (options) => {
  const { animations, sequence, animationState, node } = options
  if (!isValidAnimationOptions(options)) return {}

  let seq = typeof sequence === 'object' ? sequence[animationState]
    : animations[sequence] ? animations[sequence][animationState]
    : /* istanbul ignore next */ {}

  seq = seq || {}

  seq = typeof seq === 'function' ? seq(node) : seq
  seq.easing = setEasing(seq)

  return seq
}

export const getAnimationStyles = (options) => {
  const { sequences } = options
  if (!isValidAnimationOptions(options) || !Array.isArray(sequences)) return {}

  return sequences.reduce((styles, sequence) => {
    return Object.assign(
      styles,
      getAnimationStylesFromSequence(Object.assign({}, options, {
        sequence
      }))
    )
  }, {})
}
