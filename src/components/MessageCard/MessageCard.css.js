import styled from 'styled-components'
import { makeFontFamily, setFontSize } from '../../styles/utilities/font'
import { getColor } from '../../styles/utilities/color'
import { FONT_FAMILY } from '../../styles/configs/constants'
import { d600Effect } from '../../styles/mixins/depth.css'
import Card from '../Card'
import Button from '../Button'
import Heading from '../Heading'
import Image from '../Image'
import ArticleCard from '../ArticleCard'
import { messageVariableClassName } from './utils/MessageCard.utils'

export const MAX_IMAGE_SIZE = 258

const fontFamily = makeFontFamily('Barlow')

export const MessageCardUI = styled(Card)`
  border-color: transparent !important;
  background-color: white;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 17px 0 20px;
  width: 300px;
  word-break: break-word;
  display: flex;
  flex-direction: column;

  overflow: auto;
  // The margin right is necessary to move scrollbar a bit to the right, from the edge - it wouldn't be distinguishable to the user when no scrollbar
  margin-right: 2px;

  &.is-align-right {
    border-bottom-right-radius: 4px;
  }
  &.is-align-left {
    border-bottom-left-radius: 4px;
  }
  &.is-with-box-shadow {
    ${d600Effect}
  }
  &.is-mobile {
    width: 100%;

    .is-h4 {
      font-size: 20px !important;
      line-height: 24px !important;
    }

    .is-h5 {
      font-size: 14px !important;
      margin-top: 10px;
    }

    .c-Text {
      font-size: 14px !important;
      line-height: 22px;
      margin-top: 20px;
    }

    .c-Button {
      margin-top: 30px;
      font-size: 16px !important;
      height: 65px !important;
    }
  }
`

export const MessageCardWrapperUI = styled('div')`
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  transform: translateY(${({ visible }) => (visible ? '0' : '12px')});
  transition: ${({ withAnimation }) =>
    withAnimation ? `all 300ms ease-in-out` : 'none'};
`

export const TitleUI = styled(Heading)`
  ${fontFamily};
  line-height: 22px !important;
  padding: 0 20px;
  flex: 0 0 auto;
`

export const SubtitleUI = styled(Heading)`
  ${setFontSize(12)};
  line-height: 18px !important;
  margin-top: 6px;
  padding: 0 20px;
  flex: 0 0 auto;
`

const editorHtmlFontSize = 14

export const ContentUI = styled.div`
  margin-top: ${({ withMargin }) => (withMargin ? '20px' : '0')};
  padding: 0 18px 0 20px;
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 20px;
  }
`

export const BodyUI = styled.div`
  color: ${getColor('charcoal.700')};
  font-size: ${editorHtmlFontSize}px;
  line-height: 22px;
  flex: 1 1 100%;

  p {
    font-size: ${editorHtmlFontSize}px;
    margin: 15px 0;
    padding: 0;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  ul,
  ol {
    padding: 0;
    margin: 15px 0 0;

    ul.& {
      list-style-type: disc;
    }
    ol.& {
      list-style-type: decimal;
    }

    & > ul {
      list-style-type: circle;
      margin-left: 15px;
      margin-top: 0;

      & > ul {
        list-style-type: square;

        & > ul {
          list-style-type: disc;
        }
      }
    }

    & > ol {
      list-style-type: lower-latin;
      margin-left: 15px;
      margin-top: 0;

      & > ol {
        list-style-type: lower-roman;

        & > ol {
          list-style-type: decimal;
        }
      }
    }

    &:first-child {
      margin-top: 0;
    }
  }

  ul li {
    font-size: ${editorHtmlFontSize}px;
    margin-left: 30px;
    padding-left: 7px;

    @-moz-document url-prefix() {
      & {
        margin-left: 26px;
        padding-left: 12px;
      }
    }
  }

  ol li {
    font-size: ${editorHtmlFontSize}px;
    margin-left: 27px;
    padding-left: 10px;
  }

  blockquote {
    margin: 15px 0 0 15px;
    padding: 0 25px 0 20px;
    border-left: 2px solid ${getColor('grey.500')};
    color: ${getColor('charcoal.400')};

    &:first-child {
      margin-top: 0;
    }

    p {
      font-size: ${editorHtmlFontSize}px;
    }
  }

  code.inline-code {
    display: inline-block;
    color: ${getColor('red.500')};
    caret-color: ${getColor('red.500')};
    padding: 0 7px;
    font-size: 12px;
    position: relative;
    margin: 0 1px;
    background: ${getColor('grey.300')};
    border-radius: 4px;
    font-family: var(--HSDSGlobalFontFamilyMono);
    min-height: 24px;
    line-height: 24px;

    b,
    strong {
      color: ${getColor('red.500')};
    }
  }

  pre {
    font-family: var(--HSDSGlobalFontFamilyMono);
    margin: 15px 0;
    padding: 15px 25px;
    border: 1px solid ${getColor('grey.500')};
    border-radius: 2px;
    background-color: ${getColor('grey.200')};
    color: ${getColor('charcoal.800')};
    word-wrap: break-word;
    white-space: pre-wrap;
    font-size: 12px;

    &:first-child {
      margin-top: 8px;
    }

    p {
      font-size: 12px;
      margin: 0;
    }
  }

  a {
    color: ${getColor('link.base')};
    cursor: pointer;
    text-decoration: none;

    &:hover,
    &:focus {
      color: ${getColor('link.hover')};
      outline-width: 0;
      text-decoration: underline;
    }

    &:active {
      color: ${getColor('link.active')};
      text-decoration: underline;
      outline-width: 0;
    }
  }

  b,
  strong {
    font-weight: bold;
    color: ${getColor('charcoal.800')};
  }
  i,
  em {
    font-style: italic;
  }
  u {
    text-decoration: none;
    border-bottom: 1px solid currentColor;
  }
  s {
    text-decoration: line-through;
  }

  span.${messageVariableClassName} {
    display: inline-flex;
    align-items: center;
    padding: 3px 8px;
    height: 20px;
    line-height: 17px;

    color: ${getColor('purple.800')};
    background-color: ${getColor('purple.200')};
    border-radius: 100px;

    // clearing any text style coming from b or i elements, as we want to have it always display the same
    font-style: normal;
    font-weight: normal;
    text-decoration: none;
    white-space: nowrap;
  }
`

export const ActionUI = styled('div')`
  margin-top: 20px;
  padding: 0 20px;
  flex: 0 0 auto;
`

export const ActionButtonUI = styled(Button)`
  ${setFontSize(14)};
  font-family: ${FONT_FAMILY};
  height: 54px !important;
  line-height: normal !important;
`

export const ImageUI = styled(Image)`
  border-radius: 3px;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  max-height: ${MAX_IMAGE_SIZE}px;
`

export const ImageContainerUI = styled('div')`
  display: flex;
  justify-content: center;
  width: 100%;
  max-height: ${MAX_IMAGE_SIZE}px;
`

export const UrlAttachmentImageUI = styled('div')`
  height: 80px;
  margin: 16px 0 -22px 0;
  overflow: hidden;

  img {
    border-radius: 4px;
    width: 100%;
  }
`

export const MessageArticleCardUI = styled(ArticleCard)`
  border: none;
  border-radius: 8px 4px 4px 8px !important;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.15) !important;
  margin-top: 6px;

  &:hover:after {
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
  }
`
