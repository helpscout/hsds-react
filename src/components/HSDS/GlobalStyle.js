/* istanbul ignore file */
import { createGlobalStyle } from 'styled-components'

export const FONT_FAMILY =
  '"Aktiv Grotesk", "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

export const FONT_FAMILY_SYSTEM =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

export const FONT_FAMILY_MONO =
  '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace'

export const BASE_FONT_SIZE = 13

export default createGlobalStyle`
  :root{
    --HSDSGlobalFontFamily: ${props =>
      props.fontFamily ? props.fontFamily : FONT_FAMILY};
    --HSDSGlobalFontFamilySystem: ${props =>
      props.fontFamilySystem ? props.fontFamilySystem : FONT_FAMILY_SYSTEM};
    --HSDSGlobalFontFamilyMono: ${props =>
      props.fontFamilyMono ? props.fontFamilyMono : FONT_FAMILY_MONO};
    --HSDSGlobalFontSize: ${props =>
      props.fontSize ? props.fontSize : BASE_FONT_SIZE}px;
  }

  ${props => (props.scope ? props.scope : '.hsds-react')} {
    box-sizing: border-box;
    font-family: var(--HSDSGlobalFontFamily);
    font-size: var(--HSDSGlobalFontSize);

    *, *::before, *::after {
      box-sizing: border-box;
    }
  }

  //reset element-level styling from hs-app
  a, abbr, address, blockquote, body, button, code, dd, dl, dt, form, figure, fieldset, img, input, h1, h2, h3, h4, h5, h6, label, legend, li, ol, pre, svg, table, textarea, ul {
    margin: ${props => (props.cssReset ? 'initial' : null)};
    padding: ${props => (props.cssReset ? 'initial' : null)};
    height: ${props => (props.cssReset ? 'initial' : null)};
    width: ${props => (props.cssReset ? 'initial' : null)};
    line-height: ${props => (props.cssReset ? 'initial' : null)};
    border: ${props => (props.cssReset ? 0 : null)};
  }
`
