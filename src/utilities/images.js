export const calculateAspectRatioFit = (props) => {
  const { width, height, maxWidth, maxHeight } = props

  if (width < maxWidth && height < maxHeight) {
    return {
      width,
      height,
    }
  }

  const ratioWidth = maxWidth / width
  const ratioHeight = maxHeight / height
  const ratio = Math.min(ratioWidth, ratioHeight)

  return {
    width: width * ratio,
    height: height * ratio,
  }
}
