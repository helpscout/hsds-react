// @flow
import { getColor } from '../utilities/color'

const linkStyles = () => `
  color: ${getColor('blue.500')};
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: ${getColor('blue.400')};
    outline-width: 0;
    text-decoration: underline;
  }

  &:active {
    color: ${getColor('blue.400')};
    outline-width: 0;
  }
`

export default linkStyles
