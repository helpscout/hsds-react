// @flow
import React from 'react'
import PropTypes from 'prop-types'
import Attachment from '../Attachment'
import Icon from '../Icon'
import Inline from '../Inline'
import Overflow from '../Overflow'
import styled from '../styled'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import css from './styles/AttachmentList.css.js'
import { providerContextTypes } from '../Attachment/propTypes'
import type { AttachmentContext } from '../Attachment/types'

type Props = {
  children?: any,
  className?: string,
  downloadAllLabel: string,
  onDownloadAllClick: () => void,
  showDownloadAll: boolean,
  withOverflow: boolean,
}

export const AttachmentList = (props: Props, context: AttachmentContext) => {
  const {
    children,
    className,
    downloadAllLabel,
    onDownloadAllClick,
    showDownloadAll,
    withOverflow,
    ...rest
  } = props
  const { theme } = context

  const isThemePreview = theme === 'preview'

  const componentClassName = classNames(
    'c-AttachmentList',
    theme && `is-theme-${theme}`,
    withOverflow && 'is-withOverflow',
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
      <Overflow remapScrollDirections>{contentMarkup}</Overflow>
    ) : (
      contentMarkup
    )

  return (
    <div className={componentClassName} {...rest}>
      {wrappedContentMarkup}
    </div>
  )
}

AttachmentList.displayName = 'AttachmentList'
AttachmentList.defaultProps = {
  downloadAllLabel: 'Download All',
  onDownloadAllClick: noop,
  showDownloadAll: true,
  withOverflow: true,
}
AttachmentList.contextTypes = providerContextTypes

export default styled(AttachmentList)(css)
