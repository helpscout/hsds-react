import { getColor } from '../../../styles/utilities/color'
import styled from 'styled-components'

export const HighlightUI = styled('pre')`
  margin: 0;

  .hljs-comment,
  .hljs-quote {
    color: ${getColor('grey.800')};
  }

  .hljs-variable,
  .hljs-template-variable,
  .hljs-tag,
  .hljs-name,
  .hljs-selector-id,
  .hljs-selector-class,
  .hljs-regexp,
  .hljs-deletion {
    color: ${getColor('red.600')};
  }

  .hljs-number,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-literal,
  .hljs-type,
  .hljs-params,
  .hljs-meta,
  .hljs-link {
    color: ${getColor('orange.600')};
  }

  .hljs-attribute {
    color: ${getColor('yellow.600')};
  }

  .hljs-string,
  .hljs-symbol,
  .hljs-bullet,
  .hljs-addition {
    color: ${getColor('green.600')};
  }

  .hljs-title,
  .hljs-section,
  .hljs-keyword,
  .hljs-selector-tag {
    color: ${getColor('blue.600')};
  }

  .hljs {
    color: ${getColor('charcoal.400')};
  }
`
