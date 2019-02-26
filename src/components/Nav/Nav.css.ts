import styled from '../styled'
import baseStyles from '../../styles/resets/baseStyles.css'

export const NavUI = styled('div', { pure: false })`
  ${baseStyles};
  display: flex;
  margin: 0 auto;
`

export const ItemUI = styled('div', { pure: false })`
  padding: 0 20px;

  .c-NavItemLink {
    padding: 0 5px;
  }
`
