import styled from '../styled'
import Toolbar from '../Toolbar'

import { getColor } from '../../styles/utilities/color'
import baseStyles from '../../styles/resets/baseStyles.css'

export const TabBarUI = styled('nav')`
  --BlueConfigGlobalFontSize: 14px;
  ${baseStyles};
  display: flex;
  margin: 0 auto;

  .c-ToolbarWrapper {
    width: 100%;
  }
`

export const RightContentUI = styled('div')`
  font-size: 14px;
  color: ${getColor('charcoal.200')};
  display: flex;
  align-items: center;
  margin-bottom: calc(9px * -1);

  b,
  strong {
    font-weight: 500;
    color: ${getColor('charcoal.600')};
  }
`

// adjust margin to have to active bar hover the toolbar border
export const ToolbarUI = styled(Toolbar)`
  width: 100%;
  padding-left: 0;
  padding-right: 0;

  &.is-placement-top.is-size-sm .c-Nav {
    margin-bottom: calc(9px * -1);
  }
`
