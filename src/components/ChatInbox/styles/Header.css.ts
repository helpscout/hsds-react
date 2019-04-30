import styled from '../../styled'
import Flexy from '../../Flexy'
import baseStyles from '../../../styles/resets/baseStyles.css'

export const config = {
  height: 54,
}

export const HeaderUI = styled('div')`
  ${baseStyles};

  &.is-collapsible {
    cursor: pointer;
  }
`

export const ContentUI = styled(Flexy)`
  min-height: ${config.height}px;
  padding: 12px 20px;
`

export default HeaderUI
