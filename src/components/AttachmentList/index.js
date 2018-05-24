import React from 'react'
import PropTypes from 'prop-types'
import Attachment from '../Attachment'
import Icon from '../Icon'
import Inline from '../Inline'
import Overflow from '../Overflow'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { providerContextTypes } from '../Attachment/propTypes'

export const propTypes = {
  downloadAllLabel: PropTypes.string,
  onDownloadAllClick: PropTypes.func,
  showDownloadAll: PropTypes.bool,
}

const defaultProps = {
  downloadAllLabel: 'Download All',
  onDownloadAllClick: noop,
  showDownloadAll: true,
}

const contextTypes = providerContextTypes

const AttachmentList = (props, context) => {
  const {
    children,
    className,
    downloadAllLabel,
    onDownloadAllClick,
    showDownloadAll,
    ...rest
  } = props
  const { theme } = context

  const isThemePreview = theme === 'preview'

  const componentClassName = classNames(
    'c-AttachmentList',
    theme && `is-theme-${theme}`,
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
    <Overflow className="c-AttachmentList__content">
      <div className="c-AttachmentList__overflowContent">{childrenMarkup}</div>
    </Overflow>
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

  return (
    <div className={componentClassName} {...rest}>
      {contentMarkup}
    </div>
  )
}

AttachmentList.propTypes = propTypes
AttachmentList.defaultProps = defaultProps
AttachmentList.contextTypes = contextTypes
AttachmentList.displayName = 'AttachmentList'

export default AttachmentList
