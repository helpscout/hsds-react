// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { BEM } from '../../../utilities/classNames'
import { getColor } from '../../../styles/utilities/color'

const bem = BEM('.c-ArticleCard')

const grey600 = getColor('grey.600')

export const config = {
  hoverStyle: {
    baseShadow: `box-shadow: #{0 1px 3px 0 rgba(black, 0.1), 
                            inset 0 0 0 1px rgba(${grey600}, 0.7), 
                            inset 0 -1px 0px 0px ${grey600}}`,
    baseHoverShadow: `box-shadow: 0 3px 12px 0 rgba(black, 0.1)`,
  },
}

const css = `
  ${baseStyles}

  margin-bottom: 3px;
  padding: 20px 18px 27px;
  position: relative;
  will-change: box-shadow;
  word-wrap: break-word; 

  -moz-osx-font-smoothing: antialiased;
  -webkit-font-smoothing: antialiased;

  ${bem.element('title')} {
    color: ${getColor('blue.500')};
    line-height: 1.5;
    margin-bottom: 5px;
    transition: all 200ms linear;
  }

  ${bem.element('footer')} {
    margin-top:8px;
  }

  ${bem.element('content')} {
    margin: 0;
  }

  .c-AvatarStack{
    margin-bottom:-5px;
  }

  ${bem.element('metaHeader')} {
    margin-bottom:7px;
  }

  &:hover{
    ${bem.element('title')} {
      color: ${getColor('blue.600')};
    }   
  }

  &.is-hoverable {
    box-shadow: ${config.hoverStyle.baseShadow};
    border: none;
    transform: translateZ(0);
    text-decoration:none;

    &:hover {
      border: none;
      box-shadow: ${config.hoverStyle.baseShadow};
    }

    &:after {
      box-shadow: ${config.hoverStyle.baseHoverShadow};
      border-radius: 4px;
      content: '';
      height: 100%;
      left: 0;
      opacity: 0;
      position: absolute;
      top: 0;
      transform: translateZ(0);
      transition: all 200ms linear;
      width: 100%;
      z-index: -1;
    }

    &:hover:after {
      opacity: 1;
    }
  }


`

export default css
