import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { d300Effect, d400Effect } from '../../styles/mixins/depth.css'
import Heading from '../Heading'
import Text from '../Text'

export const RadioCardUI = styled('label')`
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '80px')};
  min-width: 0;
  min-height: ${({ withContent, withHeading }) =>
    withHeading || withContent ? 'auto' : '100px'};
  height: ${({ height }) => (height ? height : 'auto')};
  padding: 14px 12px 14px;
  border-radius: 4px;
  ${d300Effect}
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    ${d400Effect}
    transform: translateY(-2px);
  }

  &.is-focused,
  &.is-focused.is-checked,
  &:focus-within,
  &.is-checked:focus-within {
    border-radius: 7px;
    box-shadow: 0px 0px 0 2px ${getColor('blue.500')};
  }

  &.is-checked {
    &:hover {
      transform: scale(1.05) translateY(-2px);
    }

    &,
    &.is-focused,
    &.is-focused.is-checked,
    &:focus-within,
    &.is-checked:focus-within {
      transform: scale(1.05);
    }
  }
`

export const IconWrapperUI = styled('div')`
  align-items: center;
  justify-content: center;
  display: flex;
  width: auto;
  height: ${({ iconSize }) => (iconSize ? `${iconSize}px` : 'auto')};
  min-height: ${({ iconSize }) => (iconSize ? `${iconSize}px` : '52px')};
  margin-bottom: ${({ withHeading }) => (withHeading ? '0' : '10px')};
  color: ${getColor('charcoal.200')};
  opacity: 0.5;

  &.is-checked {
    opacity: 1;
    color: ${getColor('charcoal.500')};
  }
`

export const HeadingUI = styled(Heading)`
  font-size: 13px;
  margin-bottom: 0;
  color: ${getColor('charcoal.700')};
  text-align: center;
`

export const ContentUI = styled(Text)`
  font-size: 13px;
  margin-bottom: 10px;
  color: ${getColor('charcoal.200')};
  text-align: center;
`

export default RadioCardUI
