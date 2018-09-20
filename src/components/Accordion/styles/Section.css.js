// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'

export const SectionUI = styled('div')`
  ${baseStyles};

  border-bottom: 1px solid rgba(193, 203, 212, 0.7);

  &:last-child {
    border-bottom: none;
  }
`

export const TitleUI = styled('div')`
  ${baseStyles};
  padding: 20px 20px;

  &:hover,
  &:focus,
  &.is-open {
    background-color: #f9fafa;
  }

  &.is-open {
    border-bottom: 1px solid rgba(193, 203, 212, 0.7);
  }

  &.is-md {
    padding: 20px 20px;
  }
  &.is-sm {
    padding: 12px 20px;
  }
  &.is-xs {
    padding: 8px 20px;
  }
`

export const BodyUI = styled('div')`
  ${baseStyles};

  padding: 20px 20px;

  &.is-md {
    padding: 20px 20px;
  }

  &.is-sm {
    padding: 12px 20px;
  }

  &.is-xs {
    padding: 8px 20px;
  }
`
