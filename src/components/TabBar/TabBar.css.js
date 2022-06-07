import styled from 'styled-components'
import Toolbar from '../Toolbar'

import { getColor } from '@hsds/utils-color'
import { setFontSize } from '@hsds/utils-fonts'

const getAlignment = align => {
  switch (align) {
    case 'center':
      return 'center'
    default:
      return 'flex-start'
  }
}

const getDirection = align => {
  switch (align) {
    case 'right':
      return 'row-reverse'
    default:
      return 'row'
  }
}

export const TabBarUI = styled('nav')`
  ${setFontSize(14)};

  display: flex;
  margin: 0 auto;

  .c-Toolbar {
    justify-content: ${props => getAlignment(props.align)};
    flex-direction: ${props => getDirection(props.align)};
  }

  .c-ToolbarWrapper {
    width: 100%;
  }
`

export const SecContentUI = styled(Toolbar.Item)`
  ${setFontSize(14)};
  color: ${getColor('charcoal.200')};
  display: flex;
  align-items: center;
  margin-bottom: calc(8px * -1);

  &.is-defaultItem {
    margin-left: ${props => (props.align !== 'right' ? 'auto' : '0')};
    margin-right: ${props => (props.align === 'right' ? 'auto' : '0')};
  }

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
    /* margin-bottom: calc(9px * -1); */
  }
`
