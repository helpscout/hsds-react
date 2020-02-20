export let svgSet = {}

export const load = (svgs = {}) => (svgSet = svgs)

export const unload = () => load({})

export const injectFillColorIntoSvg = (
  svgHTML,
  props = {
    primary: '',
    secondary: '',
    ui: '',
    uiLight: '',
    uiDark: '',
    uiTransparent: '',
    uiWhite: '',
  }
) => {
  if (typeof svgHTML !== 'string' || !svgHTML.length) return ''
  const {
    primary,
    secondary,
    ui,
    uiLight,
    uiDark,
    uiTransparent,
    uiWhite,
  } = props

  const makeStyle = color =>
    color && color.length ? `style="fill: ${color};"` : ''

  return svgHTML
    .replace('data-path-primary=""', makeStyle(primary))
    .replace('data-path-secondary=""', makeStyle(secondary))
    .replace('data-path-ui=""', makeStyle(ui))
    .replace('data-path-uiDark=""', makeStyle(uiDark))
    .replace('data-path-uiLight=""', makeStyle(uiLight))
    .replace('data-path-uiTransparent=""', makeStyle(uiTransparent))
    .replace('data-path-uiWhite=""', makeStyle(uiWhite))
}
