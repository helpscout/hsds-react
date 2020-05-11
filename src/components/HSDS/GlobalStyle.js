/* istanbul ignore file */
import { createGlobalStyle } from 'styled-components'

export const FONT_FAMILY =
  '"Aktiv Grotesk", "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

export const FONT_FAMILY_MONO =
  '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace'

export const BASE_FONT_SIZE = 13

export default createGlobalStyle`
  :root{
    --HSDSGlobalFontFamily: ${props =>
      props.fontFamily ? props.fontFamily : FONT_FAMILY};
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
`
