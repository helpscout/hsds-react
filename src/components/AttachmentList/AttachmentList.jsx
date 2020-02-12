import React from 'react'
import PropTypes from 'prop-types'
import Attachment from '../Attachment'
import Icon from '../Icon'
import Inline from '../Inline'
import Overflow from '../Overflow'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { AttachmentListUI } from './AttachmentList.css'

export class AttachmentList extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    downloadAllLabel: PropTypes.string,
    onDownloadAllClick: PropTypes.func,
    showDownloadAll: PropTypes.bool,
    withOverflow: PropTypes.bool,
  }

  static defaultProps = {
    children: [],
    downloadAllLabel: 'Download All',
    onDownloadAllClick: noop,
    showDownloadAll: true,
    withOverflow: true,
  }

  static contextTypes = {
    theme: () => null,
  }

  handleApplyFade = () => {}
  handleScrollToEnd = () => {}

  componentDidMount() {
    this.handleApplyFade()
  }

  componentDidUpdate(prevProps) {
    if (this.didAddNewAttachment(prevProps)) {
      this.handleOnAddNewAttachment()
    }
  }

  /**
   * Method to update the UI (DOM) when new attachments have been added.
   */
  handleOnAddNewAttachment() {
    this.handleScrollToEnd()
  }

  /**
   * Determines if new attachments have been added.
   *
   * @param   {Object} prevProps The previous props.
   * @returns {boolean} Whether new attachments have been added.
   */
  didAddNewAttachment(prevProps = this.props) {
    /* istanbul ignore if */
    if (!this.props.children) return false

    const prevAttachments = React.Children.toArray(prevProps.children)
    const currentAttachments = React.Children.toArray(this.props.children)

    return prevAttachments.length < currentAttachments.length
  }

  render() {
    const {
      children,
      className,
      downloadAllLabel,
      onDownloadAllClick,
      showDownloadAll,
      withOverflow,
      ...rest
    } = this.props
    const { theme } = this.context

    const isThemePreview = theme === 'preview'

    const componentClassName = classNames(
      'c-AttachmentList',
      theme && `is-theme-${theme}`,
      withOverflow && 'withOverflow',
      className
    )

    const attachmentChildren = React.Children.toArray(children).filter(
      child => child.type && child.type === Attachment
    )

    const childrenMarkup = attachmentChildren.length
      ? attachmentChildren.map((child, index) => {
          const { id, name } = child.props
          const key = id || `${name}-${index}`

          return (
            <Inline.Item
              className="c-AttachmentList__inlineListItem c-AttachmentWrapper"
              key={key}
            >
              {React.cloneElement(child, {
                ...child.props,
              })}
            </Inline.Item>
          )
        })
      : null

    const downloadAllMarkup =
      showDownloadAll && attachmentChildren.length > 1 ? (
        <Inline.Item className="c-AttachmentList__inlineListItemDownloadAll">
          <Attachment
            name={downloadAllLabel}
            onClick={onDownloadAllClick}
            type="action"
          />
        </Inline.Item>
      ) : null

    const contentMarkup = isThemePreview ? (
      <div className="c-AttachmentList__content">{childrenMarkup}</div>
    ) : (
      <Inline className="c-AttachmentList__content c-AttachmentList__inlineList">
        <Inline.Item>
          <Icon
            className="c-AttachmentList__icon"
            name="attachment"
            shade="faint"
          />
        </Inline.Item>
        {childrenMarkup}
        {downloadAllMarkup}
      </Inline>
    )

    const wrappedContentMarkup =
      withOverflow && isThemePreview ? (
        <Overflow
          remapScrollDirections
          refApplyFade={fn => (this.handleApplyFade = fn)}
          refScrollToEnd={fn => (this.handleScrollToEnd = fn)}
        >
          {contentMarkup}
        </Overflow>
      ) : (
        contentMarkup
      )

    return (
      <AttachmentListUI className={componentClassName} {...rest}>
        {wrappedContentMarkup}
      </AttachmentListUI>
    )
  }
}

export default AttachmentList