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
