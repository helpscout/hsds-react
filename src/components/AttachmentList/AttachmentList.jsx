import React, { useContext, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import getValidProps from '@helpscout/react-utils/dist/getValidProps'

import Attachment from '../Attachment'
import Icon from '../Icon'
import Overflow from '../Overflow'
import classNames from 'classnames'
import { AttachmentListUI, ContentUI } from './AttachmentList.css'
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
    onScrollEnd,
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
  const shouldShowDownloadAll =
    showDownloadAll === undefined
      ? isThemePreview
        ? false
        : true
      : showDownloadAll

  useEffect(() => {
    overflowCallback.current.handleApplyFade()
    overflowCallback.current.handleScrollToEnd()
    onScrollEnd && onScrollEnd()
  }, [attachmentChildren.length, onScrollEnd])

  const componentClassName = classNames(
    'c-AttachmentList',
    theme && `is-theme-${theme}`,
    withOverflow && 'withOverflow',
    className
  )

  const getDownloadAllMarkup = () => {
    if (!shouldShowDownloadAll || attachmentChildren.length <= 1) return null

    if (isThemePreview) {
      return (
        <IconButton
          className="AttachmentList__DownloadAll"
          theme="grey"
          icon="inbox"
          seamless
          onClick={onDownloadAllClick}
          title={downloadAllLabel}
        />
      )
    }

    return (
      <Attachment
        elementClassName="AttachmentList__DownloadAll"
        name={downloadAllLabel}
        onClick={onDownloadAllClick}
        type="action"
        as="button"
      />
    )
  }

  const getContentMarkup = () => {
    return (
      <ContentUI className="c-AttachmentList__content">
        {!isThemePreview && (
          <Icon
            className="c-AttachmentList__icon"
            name="attachment"
            shade="faint"
          />
        )}
        {attachmentChildren}
        {getDownloadAllMarkup()}
      </ContentUI>
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
  'data-testid': 'AttachmentList',
  downloadAllLabel: 'Download All',
  onDownloadAllClick: noop,
  withOverflow: true,
}

AttachmentList.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Data attr for RTL tests. */
  'data-testid': PropTypes.string,
  /** Text label for the "Download All" attachment. */
  downloadAllLabel: PropTypes.string,
  /** Callback when the scroll container was moved to the end. */
  onScrollEnd: PropTypes.func,
  /** The callback when the "Download All" attachment is clicked. */
  onDownloadAllClick: PropTypes.func,
  /** Show/hides the "Download All" attachment. */
  showDownloadAll: PropTypes.bool,
  /** Adds overflow styles on the list. */
  withOverflow: PropTypes.bool,
}

export default AttachmentList
