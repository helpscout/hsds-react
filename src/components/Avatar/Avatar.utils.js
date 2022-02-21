import { getEasingTiming } from '../../utilities/easing'

export const getImageSrc = props => {
  const { fallbackImage, image } = props
  const src = [image]
  if (fallbackImage) {
    src.push(fallbackImage)
  }
  return src.filter(i => !!i)
}

export const getAnimationProps = props => {
  const { animationDuration, animationEasing, animation } = props
  if (!animation) {
    return {}
  }

  return {
    animationDuration,
    animationEasing: getEasingTiming(animationEasing),
    animation,
  }
}

export const nameToInitials = (name = '') => {
  // Returning early if undefined to avoid casting undefined to "undefined"
  if (!name) {
    return ''
  }

  // Trim trailing whitespace
  name = (name + '').trim()
  if (!name.length) {
    return ''
  }

  const words = name
    .split(' ')
    .filter(w => w !== '')
    .map(w => w[0])
    .map(w => w.toUpperCase())

  return words.length === 1 ? words[0] : words[0] + words[words.length - 1]
}
