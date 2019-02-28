import styled from '../styled'
import baseStyles from '../../styles/resets/baseStyles.css'

export const config = {
  height: '54px',
}

export const ToolbarUI = styled('div')`
  ${baseStyles};
  background-color: white;
  min-height: ${config.height};
  padding: 4px 8px;
  position: relative;
`
