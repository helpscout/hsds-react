import forEach from '../../../styles/utilities/forEach'

export const HR_SIZES = {
  md: 20,
  sm: 12,
  xs: 8,
  none: 0,
}
export const HR_COLOR = '#eee'

const css = `
  border: 0;
  border-top-color: ${HR_COLOR};
  border-top-style: solid;
  border-top-width: 1px;
  box-sizing: content-box;
  display: block;
  height: 0;
  margin: 20px 0;

  ${makeSizeStyles()}
`

function makeSizeStyles(): string {
  const sizes = Object.keys(HR_SIZES)

  return forEach(
    sizes,
    size => `
    &.is-${size} {
      margin-bottom: ${HR_SIZES[size]}px;
      margin-top: ${HR_SIZES[size]}px;
    }
  `
  )
}

export default css
