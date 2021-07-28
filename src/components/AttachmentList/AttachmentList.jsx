import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Attachment from '../Attachment'
import Icon from '../Icon'
import Inline from '../Inline'
import Overflow from '../Overflow'
import classNames from 'classnames'
import { noop } from '../../utilities/other'
import { AttachmentListUI } from './AttachmentList.css'

export class AttachmentList extends React.Component {
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
      <AttachmentListUI className={componentClassName} {...getValidProps(rest)}>
        {wrappedContentMarkup}
      </AttachmentListUI>
    )
  }
}

AttachmentList.defaultProps = {
  'data-cy': 'AttachmentList',
  downloadAllLabel: 'Download All',
  onDownloadAllClick: noop,
  showDownloadAll: true,
  withOverflow: true,
}

AttachmentList.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Text label for the "Download All" attachment. */
  downloadAllLabel: PropTypes.string,
  /** The callback when the "Download All" attachment is clicked. */
  onDownloadAllClick: PropTypes.func,
  /** Show/hides the "Download All" attachment. */
  showDownloadAll: PropTypes.bool,
  /** Adds overflow styles on the list. */
  withOverflow: PropTypes.bool,
}

export default AttachmentList
