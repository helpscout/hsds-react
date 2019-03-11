import styled from '../styled'
import Card from '../Card'
import Button from '../Button'
import Heading from '../Heading'
import Text from '../Text'
import baseStyles from '../../styles/resets/baseStyles.css'
import {
  addFontSmoothing,
  makeFontFamily,
  setFontSize,
} from '../../styles/utilities/font'

const fontFamily = makeFontFamily('Barlow')

export const GreeterCardUI = styled(Card)`
  ${baseStyles};
  background-color: white;
  border-color: transparent !important;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 20px 20px 25px;
  width: 300px;

  &.is-align-right {
    border-bottom-right-radius: 4px;
  }
  &.is-align-left {
    border-bottom-left-radius: 4px;
  }
`

export const TitleUI = styled(Heading)`
  ${fontFamily};
  margin-top: 5px;
`

export const SubtitleUI = styled(Heading)`
  ${setFontSize(12)};
  margin-top: 6px;
`

export const BodyUI = styled(Text)`
  ${setFontSize(14)};
  letter-spacing: 0.37px;
  margin-top: ${({ withMargin }) => (withMargin ? '12px' : '0')};
`

export const ActionUI = styled('div')`
  margin-bottom: -5px;
  margin-top: 20px;
`

export const ActionButtonUI = styled(Button)`
  ${setFontSize(14)};
`
