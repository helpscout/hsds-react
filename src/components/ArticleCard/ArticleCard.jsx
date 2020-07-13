import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Text from '../Text'
import Truncate from '../Truncate'
import { classNames } from '../../utilities/classNames'
import { isString } from '../../utilities/is'
import {
  ArticleCardUI,
  ContentUI,
  MetaHeaderUI,
  FooterUI,
  TitleUI,
} from './ArticleCard.css'

export class ArticleCard extends React.PureComponent {
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

  renderContentMarkup() {
    const { content, contentLimit, contentSize } = this.props

    if (isString(content)) {
      return (
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
      )
    }

    return <div className="c-ArticleCard__contentMarkup">{content}</div>
  }

  renderContent = () => {
    const { content } = this.props

    return (
      !!content && (
        <ContentUI className="c-ArticleCard__content">
          {this.renderContentMarkup()}
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
      'data-cy': dataCy,

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
      <ArticleCardUI {...getValidProps(rest)} className={componentClassName}>
        {this.renderMetaHeader()}
        {this.renderTitle()}
        {this.renderContent()}
        {this.renderFooter()}
      </ArticleCardUI>
    )
  }
}

ArticleCard.defaultProps = {
  contentLimit: 160,
  contentSize: 13,
  'data-cy': 'ArticleCard',
  isHovered: false,
  titleLimit: 120,
  titleSize: 13,
}

ArticleCard.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Content of the card. Will be truncated based on the contentLimit prop if content is a string. */
  content: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  /** The amount of characters to keep before truncation on the content string. */
  contentLimit: PropTypes.number,
  /** The `Text` font-size for the content. */
  contentSize: PropTypes.number,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Element that will be displayed below the content */
  footer: PropTypes.any,
  /** Renders hovered styles. */
  isHovered: PropTypes.bool,
  /** Element that will be displayed above the title */
  metaHeader: PropTypes.any,
  /** Title of the card. Will be truncated based on the titleLimit prop */
  title: PropTypes.string,
  /** The amount of characters to keep before truncation on the title string. */
  titleLimit: PropTypes.number,
  /** The `Text` font-size for the title. */
  titleSize: PropTypes.number,
}

export default ArticleCard
