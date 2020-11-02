import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { d300, d300Effect } from '../../styles/mixins/depth.css'
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
  padding: 5px 12px 15px;
  border-radius: 4px;
  ${d300}
  cursor: pointer;

  &:hover {
    ${d300Effect}
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
    ${d300Effect}
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
