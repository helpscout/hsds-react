import styled from '../../styled'
import Card from '../../Card'
import Button from '../../Button'
import Heading from '../../Heading'
import Text from '../../Text'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { makeFontFamily, setFontSize } from '../../../styles/utilities/font'

const fontFamily = makeFontFamily('Barlow')

export const GreeterCardUI = styled(Card)`
  ${baseStyles};
  background-color: white;
  border-color: transparent !important;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px 20px 25px;
  width: 300px;

  &.is-align-right {
    border-bottom-right-radius: 4px;
  }
  &.is-align-left {
    border-bottom-left-radius: 4px;
  }
  &.is-with-box-shadow {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.15);
  }
`

export const TitleUI = styled(Heading)`
  ${fontFamily};
  line-height: 22px !important;
  margin-top: 5px;
`

export const SubtitleUI = styled(Heading)`
  ${setFontSize(12)};
  line-height: 18px !important;
  margin-top: 6px;
`

export const BodyUI = styled(Text)`
  ${setFontSize(13)};
  line-height: 20px;
  margin-top: ${({ withMargin }) => (withMargin ? '12px' : '0')};
  white-space: pre-wrap;
`

export const ActionUI = styled('div')`
  margin-bottom: -5px;
  margin-top: 20px;
`

export const ActionButtonUI = styled(Button)`
  ${setFontSize(14)};
`
