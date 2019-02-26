import styled from '../styled'
import Flexy from '../Flexy'
import Text from '../Text'
import { getColor } from '../../styles/utilities/color'
import baseStyles from '../../styles/resets/baseStyles.css'

export const config = {
  indicatorTransition: 'opacity 100ms ease',
}

export const NavUI = styled('div', { pure: false })`
  ${baseStyles};
  display: flex;
  margin: 0 auto;
`

export const ItemUI = styled('div', { pure: false })`
  padding: 0 10px;
  transform: translateZ(0);

  &.is-disabled {
    pointer-events: none;
    opacity: 0.6;
  }

  .c-NavItemLink {
    display: block;
    text-decoration: none !important;
  }
`

export const ContentUI = styled('div')`
  padding: 15px 6px 15px 5px;
  position: relative;
  text-align: center;
`

export const TitleUI = styled(Text)`
  color: ${getColor('charcoal.200')};
  display: block;

  ${({ isActive }) =>
    isActive &&
    `
    color: ${getColor('charcoal.500')};
    font-weight: 500;
  `};
`

export const GhostTitleUI = styled(Text)`
  display: block;
  font-weight: 500;
  height: 0;
  visibility: hidden;
`

export const ErrorWrapperUI = styled(Flexy.Item)`
  height: 0;
  position: relative;
  top: -10px;
  width: 20px;
`

export const IndicatorUI = styled('div')`
  background: ${getColor('blue.500')};
  border-radius: 9999px;
  bottom: 0;
  height: 2px;
  opacity: 0;
  left: 0;
  position: absolute;
  transition: ${config.indicatorTransition};
  width: 100%;
  will-change: opacity;

  ${({ isActive }) =>
    isActive &&
    `
    opacity: 1;
  `};
`
