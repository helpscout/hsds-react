import { styledComponent } from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css.js'

export const BlockUI = styledComponent.div`
  ${baseStyles}
  padding: 20px 20px;

  & + & {
    border-top: 1px solid rgba(193, 203, 212, 0.7);
  }

  &.is-md { padding: 20px 20px; }
  &.is-sm { padding: 12px 20px; }
  &.is-xs { padding: 8px 20px; }

  &.is-scrollableWrapper {
    padding: 0;
    max-height: 100%;
    min-height: 0;
  }

  &.is-bg-muted {
    background-color: #f9fafa;
  }

  &.is-flex {
    flex: 1;
  }
`
