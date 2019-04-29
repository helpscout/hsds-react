import styled from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css'

export const ContentUI = styled('div')`
  ${baseStyles} display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  min-height: 0;
`

export default ContentUI
