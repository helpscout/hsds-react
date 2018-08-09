// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'

export const config = {
  marginBottom: 25,
}

export const HeaderUI = styled('div')`
  ${baseStyles}
  margin-bottom: ${config.marginBottom}px;
`

export const TitleUI = styled('div')`
  ${baseStyles} margin-top: -8px;
`

export const SubTitleUI = styled('div')`
  ${baseStyles} margin-top: 5px;
`
