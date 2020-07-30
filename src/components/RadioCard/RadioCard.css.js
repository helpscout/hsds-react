import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
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
  padding: 5px 12px 15px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0px 5px 8px rgba(99, 116, 134, 0.03),
    0px 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.15s;
  will-change: box-shadow, border;
  cursor: pointer;

  &:hover {
    border: 1px solid ${getColor('grey.500')};
    box-shadow: 0px 5px 8px rgba(99, 116, 134, 0.03),
      0px 2px 8px rgba(0, 0, 0, 0.04);
    transform: translateY(-2px);
  }

  &.is-focused,
  &.is-focused.is-checked,
  &:focus-within,
  &.is-checked:focus-within {
    border-color: transparent;
    border-radius: 7px;
    box-shadow: 0px 0px 0 2px ${getColor('blue.500')};
  }

  &.is-checked {
    border: 1px solid ${getColor('grey.500')};
    box-shadow: 0px 5px 8px rgba(99, 116, 134, 0.03),
      0px 2px 8px rgba(0, 0, 0, 0.04);
  }
`

export const IconWrapperUI = styled('div')`
  align-items: center;
  justify-content: center;
  display: flex;
  width: 52px;
  height: 52px;
  margin-bottom: ${({ withContent, withHeading }) =>
    withHeading || withContent ? '0' : '5px'};
  color: ${getColor('charcoal.200')};

  &.is-checked {
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
