import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { d400, d400Effect } from '../../styles/mixins/depth.css'
import Card from '../Card'

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
  ${d400}
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
    ${d400}
    border: none;
    transform: translateZ(0);
    text-decoration: none;

    &:hover {
      border: none;
      ${d400Effect}
      transform: translateY(-2px);
    }

    &:after {
      ${d400Effect}
      border-radius: 4px;
      content: '';
      height: 100%;
      left: 0;
      opacity: 0;
      position: absolute;
      top: 0;
      transform: translateZ(0);
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
