import { BEM } from '../../../utilities/classNames'
import baseStyles from '../../../styles/resets/baseStyles.css'
import cardStyles, {
  cardSubtleStyles,
} from '../../../styles/mixins/cardStyles.css'
import linkStyles from '../../../styles/mixins/linkStyles.css'
import { getColor } from '../../../styles/utilities/color'

const bem = BEM('.c-Attachment')

const config = {
  imageSize: '37px',
  imageMaxWidth: '80px',
}

const css = `
  ${linkStyles()}
  ${baseStyles}
  background-color: white;
  border: 1px solid ${getColor('grey', 500)};
  border-radius: 9999px;
  display: inline-block;
  line-height: 1;
  padding: 4px 10px;
  position: relative;
  text-decoration: none;

  // Modifiers
  &.is-action {
    ${bem.element('name')} {
      text-decoration: none;
    }
  }

  // Themes
  &.is-theme-preview {
    ${cardSubtleStyles()}
    border: none;
    display: block;
    font-weight: 500;
    padding: 15px 17px;

    &.has-image {
      padding: 3px;
    }

    .c-Truncate__content {
      display: block;
      padding: 16px;
      margin: -16px;
    }
  }

  &:hover {
    border-color: ${getColor('grey', 600)};
    text-decoration: none;

    ${bem.element('name')} {
      color: ${getColor('blue', 500)};
      text-decoration: underline;
    }
  }

  ${bem.element('size')} {
    color: ${getColor('charcoal', 200)};
    margin-left: 5px;
  }

  ${bem.element('image')} {
    border-radius: 2px;
    height: ${config.imageSize};
    object-fit: cover;
    max-height: ${config.imageSize};
    max-width: ${config.imageMaxWidth};
    min-width: ${config.imageSize};
    width: auto;
  }

  ${bem.element('closeButton')} {
    ${cardStyles()}
    display: none;
    border-radius: 9999px !important;
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
    z-index: 1;
  }

  &:hover {
    ${bem.element('closeButton')} {
      display: block;
    }
  }
`

export default css
