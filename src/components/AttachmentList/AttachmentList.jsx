import React, { useContext, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import getValidProps from '@helpscout/react-utils/dist/getValidProps'

import Attachment from '../Attachment'
import Icon from '../Icon'
import Inline from '../Inline'
import Overflow from '../Overflow'
import classNames from 'classnames'
import { AttachmentListUI } from './AttachmentList.css'
import { AttachmentContext } from '../Attachment/Attachment.Provider'
import IconButton from '../IconButton'

function noop() {}

export const AttachmentList = props => {
  const {
    children,
    className,
    downloadAllLabel,
    onDownloadAllClick,
    showDownloadAll,
    withOverflow,
    theme: themeProp,
    ...rest
  } = props

  const attachmentChildren = React.Children.toArray(children).filter(
    child => child.type && child.type === Attachment
  )

  const { theme: themeContext } = useContext(AttachmentContext) || {}

  const overflowCallback = useRef({
    handleApplyFade: noop,
    handleScrollToEnd: noop,
  })

  const theme = themeContext || themeProp
  const isThemePreview = theme === 'preview'

  useEffect(() => {
    overflowCallback.current.handleApplyFade()
    overflowCallback.current.handleScrollToEnd()
  }, [attachmentChildren.length])

  const componentClassName = classNames(
    'c-AttachmentList',
    theme && `is-theme-${theme}`,
    withOverflow && 'withOverflow',
    className
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
            {child}
          </Inline.Item>
        )
      })
    : null

  const getDownloadAllMarkup = () => {
    if (!showDownloadAll || attachmentChildren.length <= 1) return null

    if (isThemePreview) {
      return (
        <Inline.Item className="c-AttachmentList__inlineListItemDownloadAll">
          <IconButton
            theme="grey"
            icon="inbox"
            seamless
            onClick={onDownloadAllClick}
            title={downloadAllLabel}
          />
        </Inline.Item>
      )
    }

    return (
      <Inline.Item className="c-AttachmentList__inlineListItemDownloadAll">
        <Attachment
          name={downloadAllLabel}
          onClick={onDownloadAllClick}
          type="action"
          as="button"
        />
      </Inline.Item>
    )
  }

  const getContentMarkup = () => {
    if (isThemePreview) {
      return (
        <div className="c-AttachmentList__content">
          {childrenMarkup}
          {getDownloadAllMarkup()}
        </div>
      )
    }

    return (
      <Inline className="c-AttachmentList__content c-AttachmentList__inlineList">
        <Inline.Item>
          <Icon
            className="c-AttachmentList__icon"
            name="attachment"
            shade="faint"
          />
        </Inline.Item>
        {childrenMarkup}
        {getDownloadAllMarkup()}
      </Inline>
    )
  }

  const wrappedContentMarkup =
    withOverflow && isThemePreview ? (
      <Overflow
        remapScrollDirections
        refApplyFade={fn => (overflowCallback.current.handleApplyFade = fn)}
        refScrollToEnd={fn => (overflowCallback.current.handleScrollToEnd = fn)}
      >
        {getContentMarkup()}
      </Overflow>
    ) : (
      getContentMarkup()
    )

  return (
    <AttachmentListUI className={componentClassName} {...getValidProps(rest)}>
      {wrappedContentMarkup}
    </AttachmentListUI>
  )
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
