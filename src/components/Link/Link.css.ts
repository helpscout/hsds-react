import styled from '../styled'
import baseStyles from '../../styles/resets/baseStyles.css'
import linkStyles from '../../styles/mixins/linkStyles.css'

export const LinkUI = styled('a')`
  ${baseStyles};
  ${linkStyles};

  &:focus {
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
