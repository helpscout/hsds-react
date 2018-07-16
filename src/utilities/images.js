// @flow

export const calculateAspectRatioFit = (props: {
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number,
}): { width: number, height: number } => {
  const { width, height, maxWidth, maxHeight } = props

  const ratioWidth = maxWidth / width
  const ratioHeight = maxHeight / height
  const ratio = Math.min(ratioWidth, ratioHeight)

  return {
    width: width * ratio,
    height: height * ratio,
  }
}
