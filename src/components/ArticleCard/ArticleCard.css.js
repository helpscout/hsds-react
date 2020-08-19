import Card from '../Card'
import styled from 'styled-components'
import { getColor, rgba } from '../../styles/utilities/color'

export const config = {
  hover: {
    baseShadow: `
      0 1px 3px 0 rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px ${rgba(getColor('grey.600'), 0.7)},
      inset 0 -1px 0 0 ${getColor('grey.600')};
    `,
    baseHoverShadow: `0 4px 40px 0 ${rgba('#000', 0.1)}`,
  },
}

export const MetaHeaderUI = styled('header')`
  margin-bottom: 10px;
`

export const ContentUI = styled('div')`
  line-height: 1.46;
  margin: 0;
`

export const TitleUI = styled('div')`
  color: ${getColor('link.base')};
  line-height: 1.3;
  margin-bottom: 7px;
  transition: all 200ms linear;
`

export const FooterUI = styled('footer')`
  margin-top: 10px;
`

export const ArticleCardUI = styled(Card)`
  margin-bottom: 3px;
  padding: 20px 20px 22px;
  position: relative;
  word-wrap: break-word;
  -moz-osx-font-smoothing: antialiased;
  -webkit-font-smoothing: antialiased;

  &:hover {
    ${TitleUI} {
      color: ${getColor('blue.600')};
      will-change: color;
    }
  }

  &.is-hoverable {
    box-shadow: ${config.hover.baseShadow};
    border: none;
    transform: translateZ(0);
    transition: all 550ms cubic-bezier(0.23, 1, 0.32, 1);
    text-decoration: none;

    &:hover {
      border: none;
      box-shadow: ${config.hover.baseShadow};
      transform: translate(0, -2px);
    }

    &:after {
      box-shadow: ${config.hover.baseHoverShadow};
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

    &:hover:after,
    &.is-hovered:after {
      opacity: 1;
      will-change: opacity;
    }
  }
`
