import { getColor } from '@hsds/utils-color'

const linkStyles = () => `
  color: ${getColor('link.base')};
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: ${getColor('link.hover')};
    outline-width: 0;
    text-decoration: underline;
  }

  &:active {
    color: ${getColor('link.active')};
    outline-width: 0;
  }
`

export default linkStyles
