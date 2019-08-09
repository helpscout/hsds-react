import baseStyles from '../../../styles/resets/baseStyles.css'
import linkStyles from '../../../styles/mixins/linkStyles.css'

const css = `
  ${baseStyles}
  padding-bottom: 4px;
  padding-top: 4px;
  
  a {
    ${linkStyles()}
  }
`

export default css
