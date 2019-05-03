//
import styled from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { getColor } from '../../../styles/utilities/color'

export const BlankSlateUI = styled('div')`
  ${baseStyles}
  background-color: ${getColor('grey.200')};
`

export const IlloWrapperUI = styled('div')`
  margin-bottom: -10px;
  margin-top: -13px;
`

export const ContentUI = styled('div')`
  padding: 16px 20px 19px;
  text-align: center;
`

export default BlankSlateUI
