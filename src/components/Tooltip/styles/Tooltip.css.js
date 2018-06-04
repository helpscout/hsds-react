import base from '../../../styles/resets/base.css'
import { color } from './variables.css'

const css = `
.Tooltip {
  ${base}

  &__arrow {
    border-color: ${color.background};
  }
}
`

export default css
