import styled from 'styled-components'

import { generateLinkStyles } from '@hsds/utils-mixins'

export const LinkUI = styled('a')`
  ${generateLinkStyles};

  &:focus {
    outline: 5px auto Highlight;
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
  }

  &.is-block {
    display: block;
  }

  &.is-no-underline {
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }

  &.is-word-wrap {
    word-break: break-word;
  }
`
