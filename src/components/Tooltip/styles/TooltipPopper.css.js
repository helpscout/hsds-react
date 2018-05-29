import baseStyles from '../../../styles/resets/baseStyles.css'

const color = {
  background: '#253540',
  text: 'white',
}

const css = `
.c-TooltipPopper {
  ${baseStyles}
  background-color: ${color.background};
  border-radius: 3px;
  color: ${color.text};
  font-size: 12px;
  padding: 6px 8px;

  &__arrow {
    border-color: ${color.background};
  }
}
`

export default css
