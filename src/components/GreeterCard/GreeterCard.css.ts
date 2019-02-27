import styled from '../styled'
import Animate from '../Animate'
import Button from '../Button'
import Heading from '../Heading'
import Text from '../Text'
import baseStyles from '../../styles/resets/baseStyles.css'
import { FONT_FAMILY } from '../../styles/configs/constants'
import { getColor } from '../../styles/utilities/color'

const fontFamily = `
  font-family: 'Barlow', ${FONT_FAMILY} !important;
`

export const GreeterCardUI = styled(Animate)`
  ${baseStyles};

  background-color: white;
  border-color: transparent !important;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.15);
  padding: 20px;
  width: 300px;

  &.is-align-right {
    border-radius: 8px 4px 4px 8px;
  }

  &.is-align-left {
    border-radius: 4px 8px 8px 4px;
  }
`

export const TitleUI = styled(Heading)`
  ${fontFamily};

  margin-top: 5px;
`

export const SubtitleUI = styled(Heading)`
  ${fontFamily};

  font-size: 13px !important;
  margin-top: 6px;
`

export const BodyUI = styled(Text)`
  ${fontFamily};

  color: ${getColor('charcoal.400')}!important;
  display: block;
  font-size: 14px !important;
  letter-spacing: 0.37px;
  margin-top: ${({ withMargin }) => (withMargin ? '12px' : '0')};
`

export const ActionUI = styled('div')`
  margin-top: 20px;
`

export const ActionButtonUI = styled(Button)`
  ${fontFamily};

  -webkit-font-smoothing: antialiased;
  font-size: 14px !important;
  letter-spacing: 0.5px;
`
