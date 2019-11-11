import React from 'react'
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
          props.fontFamilyMono ? props.fontFamilyMono : FONT_FAMILY};
        --HSDSGlobalFontSize: ${props =>
          props.fontSize ? props.fontSize : BASE_FONT_SIZE}px;
    }
    
    *, *::before, *::after {
        font-family: var(--HSDSGlobalFontFamily);
        font-size: var(--HSDSGlobalFontSize);
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
`
