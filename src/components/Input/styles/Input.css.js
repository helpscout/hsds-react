// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled/index.js'

export const config = {
  paddingSide: '16px',
}

export const InputWrapperUI = styled('div')`
  ${baseStyles};
`

export const PrefixUI = styled('div')`
  margin-bottom: -1px;
  margin-left: calc(${config.paddingSide} * -1);
  margin-top: -1px;
  margin-right: ${config.paddingSide};

  &.is-seamless {
    margin-left: 0;
  }
`

export const SuffixUI = styled('div')`
  margin-bottom: -1px;
  margin-left: ${config.paddingSide};
  margin-right: calc(${config.paddingSide} * -1);
  margin-top: -1px;

  &.is-seamless {
    margin-right: 0;
  }
`
