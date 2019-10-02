import { getEasingTiming } from '../../utilities/easing'

export const COMPONENT_KEY = 'Avatar'

export const getImageSrc = (props): string[] => {
  const { fallbackImage, image } = props
  const src = [image]
  if (fallbackImage) {
    src.push(fallbackImage)
  }
  return src
}

export const getAnimationProps = (props): object => {
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
