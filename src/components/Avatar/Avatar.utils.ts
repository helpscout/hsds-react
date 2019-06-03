import { includes } from '../../utilities/arrays'

export const COMPONENT_KEY = 'Avatar'

export const IMAGE_STATES = {
  loading: 'loading',
  loaded: 'loaded',
  failed: 'failed',
  fallbackLoading: 'fallbackLoading',
  fallbackLoaded: 'fallbackLoaded',
}

export const isImageLoaded = (props, state): boolean => {
  const { image } = props
  const { imageLoaded } = state

  return shouldUseFallbackImage(props, state)
    ? isFallbackImageLoaded(props, state)
    : !!(image && imageLoaded === IMAGE_STATES.loaded)
}

export const isFallbackImageLoaded = (props, state): boolean => {
  const { fallbackImage } = props
  const { imageLoaded } = state

  return !!(fallbackImage && imageLoaded === IMAGE_STATES.fallbackLoaded)
}

export const hasImage = (props, state): boolean => {
  const { image } = props
  const { imageLoaded } = state

  return !!(
    image &&
    includes(
      [
        IMAGE_STATES.loading,
        IMAGE_STATES.loaded,
        IMAGE_STATES.fallbackLoading,
        IMAGE_STATES.fallbackLoaded,
      ],
      imageLoaded
    )
  )
}

export const shouldUseFallbackImage = (props, state): boolean => {
  const { imageLoaded } = state
  return (
    isFallbackImageLoaded(props, state) ||
    imageLoaded === IMAGE_STATES.fallbackLoading
  )
}

export const getImageUrl = (props, state): string => {
  const { fallbackImage, image } = props
  return shouldUseFallbackImage(props, state) ? fallbackImage : image
}
