// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { BEM } from '../../../utilities/classNames'
import { getColor } from '../../../styles/utilities/color.js'
import { noteBoxShadow } from '../../../styles/mixins/noteStyles.css.js'

const config = {
  embedBorderRadius: '3px',
  embedWidth: '9999px',
  embedMaxWidth: '300px',
}

const bem = BEM('.c-MessageEmbed')

export const css = `
  ${baseStyles}

  ${bem.element('html')} {
    border-radius: ${config.embedBorderRadius};
    max-width: 100%;
    overflow: hidden;
    width: ${config.embedWidth};
  }

  ${bem.element('bubble')}.c-MessageBubble {
    background-color: white;
    border: none;
    box-shadow:
      0px 1px 3px 0px rgba(0,0,0,0.1),
      0px 0px 0px 1px rgba(193,203,212,.7) inset,
      0px -1px 0px 0px ${getColor('grey.600')} inset;
    color: ${getColor('charcoal.200')};
    display: inline-block;
    max-width: ${config.embedMaxWidth};
    overflow: hidden;
    padding: 3px;
    width: 100%;

    &.is-note {
      ${noteBoxShadow()}
      background-color: ${getColor('yellow.300')};
      color: ${getColor('yellow.800')};
    }
  }
`

export default css
