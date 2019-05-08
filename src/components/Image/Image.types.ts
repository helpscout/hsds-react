export type ImageShape = 'rounded' | 'square' | ''

export type ImageProps = {
  alt?: string
  block: boolean
  className?: string
  height?: number
  maxHeight?: number
  maxWidth?: number
  src: string
  shape?: ImageShape
  style: Object
  title?: string
  width?: number
}
