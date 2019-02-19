import styled from '../styled'
import baseStyles from '../../styles/resets/baseStyles.css.js'
import { getColor } from '../../styles/utilities/color'
import Button from '../Button'
import Text from '../Text'
import Icon from '../Icon'

const config = {
  sidePadding: '18px',
}

export const SideNavigationUI = styled('div')`
  ${baseStyles};
  background-color: ${getColor('grey.300')};
  border-right: 1px solid ${getColor('grey.500')};
  height: 100%;
  width: 250px;
  padding-top: 16px;
  padding-bottom: 100px;
  overflow: hidden;

  &.is-collapsed {
    width: 59px;
  }
`

export const SectionUI = styled('div')`
  & + & {
    margin-top: 16px;
  }
`

export const IconUI = styled('span')`
  color: ${getColor('grey.600')};
  margin-right: 10px;
`

export const CountUI = styled(Text)`
  margin-left: auto;
`

export const ButtonUI = styled(Button)`
  &.is-default {
    color: ${getColor('charcoal.400')};
    border-radius: 0;
    font-size: 14px;
    justify-content: left;
    text-decoration: none;
    width: 100%;
    padding: 0 ${config.sidePadding};

    &:focus {
      text-decoration: none;
      outline: ${getColor('charcoal.400')} auto 3px;
    }

    &:hover {
      text-decoration: none;
      background-color: ${getColor('grey.400')};
      color: ${getColor('charcoal.500')};

      ${IconUI} {
        color: ${getColor('charcoal.300')};
      }
    }

    &:disabled,
    &.is-disabled {
      color: ${getColor('charcoal.200')};
    }
  }
`

export const ItemUI = styled('div')`
  padding-bottom: 2px;

  &.is-muted {
    ${ButtonUI}.is-default {
      color: ${getColor('charcoal.200')};
    }
  }
  &.is-active {
    ${ButtonUI}.is-default {
      font-weight: bold;
      color: ${getColor('blue.600')};

      ${IconUI} {
        color: ${getColor('blue.600')};
      }
    }
  }
  &.is-disabled {
    ${ButtonUI} {
      &.is-default:disabled {
        color: ${getColor('charcoal.200')} !important;
        cursor: not-allowed;
      }
    }
  }
`

export const HeaderUI = styled('div')`
  padding: 0 ${config.sidePadding};
  color: ${getColor('charcoal.500')};
  margin-bottom: 16px;

  a {
    color: ${getColor('charcoal.500')};
    text-decoration: none;

    &:hover {
      color: ${getColor('charcoal.800')};
      cursor: pointer;
    }
  }
`
