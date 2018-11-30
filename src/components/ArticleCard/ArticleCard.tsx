import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import Text from '../Text'
import Truncate from '../Truncate'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'
import {
  ArticleCardUI,
  ContentUI,
  MetaHeaderUI,
  FooterUI,
  TitleUI,
} from './styles/ArticleCard.css'

export interface Props {
  className?: string
  content?: string
  contentLimit?: number
  contentSize?: number
  footer?: any
  isHovered: boolean
  metaHeader?: any
  title?: string
  titleLimit?: number
  titleSize?: number
}

export class ArticleCard extends React.PureComponent<Props> {
  static defaultProps = {
    contentLimit: 160,
    contentSize: 13,
    isHovered: false,
    titleLimit: 120,
    titleSize: 13,
  }

  renderTitle = () => {
    const { title, titleLimit, titleSize } = this.props

    return (
      !!title && (
        <TitleUI className="c-ArticleCard__title">
          <Text size={titleSize} weight="500">
            <Truncate limit={titleLimit} type="end">
              {title}
            </Truncate>
          </Text>
        </TitleUI>
      )
    )
  }

  renderContent = () => {
    const { content, contentLimit, contentSize } = this.props

    return (
      !!content && (
        <ContentUI className="c-ArticleCard__content">
          <Text
            block
            className="c-ArticleCard__contentText"
            size={contentSize}
            shade="muted"
          >
            <Truncate limit={contentLimit} type="end">
              {content}
            </Truncate>
          </Text>
        </ContentUI>
      )
    )
  }

  renderFooter = () => {
    const { footer } = this.props
    return (
      !!footer && (
        <FooterUI className="c-ArticleCard__footer">{footer}</FooterUI>
      )
    )
  }

  renderMetaHeader = () => {
    const { metaHeader } = this.props
    return (
      !!metaHeader && (
        <MetaHeaderUI className="c-ArticleCard__metaHeader">
          {metaHeader}
        </MetaHeaderUI>
      )
    )
  }

  render() {
    const {
      className,
      content,
      contentLimit,
      contentSize,
      footer,
      isHovered,
      metaHeader,
      title,
      titleLimit,
      titleSize,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-ArticleCard',
      isHovered && 'is-hovered',
      className
    )

    return (
      <ArticleCardUI {...rest} className={componentClassName}>
        {this.renderMetaHeader()}
        {this.renderTitle()}
        {this.renderContent()}
        {this.renderFooter()}
      </ArticleCardUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(ArticleCard)
const PropConnectedComponent = propConnect(COMPONENT_KEY)(ArticleCard)

export default PropConnectedComponent
