import styled from 'styled-components'
import Card from '../../Card'
import Button from '../../Button'
import Heading from '../../Heading'
import Text from '../../Text'
import { makeFontFamily, setFontSize } from '../../../styles/utilities/font'

const fontFamily = makeFontFamily('Barlow')

export const MessageCardUI = styled(Card)`
  background-color: white;
  border-color: transparent !important;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px 20px 25px;
  width: 300px;
  word-break: break-word;

  &.is-align-right {
    border-bottom-right-radius: 4px;
  }
  &.is-align-left {
    border-bottom-left-radius: 4px;
  }
  &.is-with-box-shadow {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.15);
  }
  &.is-mobile {
    width: 100%;

    .is-h4 {
      font-size: 20px !important;
      line-height: 24px !important;
    }

    .is-h5 {
      font-size: 14px !important;
      margin-top: 10px;
    }

    .c-Text {
      font-size: 14px !important;
      line-height: 22px;
      margin-top: 20px;
    }

    .c-Button {
      margin-top: 30px;
      font-size: 16px !important;
      height: 65px !important;
    }
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
  line-height: normal !important;
`
