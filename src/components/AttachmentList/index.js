import React from 'react'
import PropTypes from 'prop-types'
import Attachment from '../Attachment'
import Icon from '../Icon'
import Inline from '../Inline'
import classNames from '../../utilities/classNames'
import {noop} from '../../utilities/other'

export const propTypes = {
  downloadAllLabel: PropTypes.string,
  onDownloadAllClick: PropTypes.func,
  showDownloadAll: PropTypes.bool
}

const defaultProps = {
  downloadAllLabel: 'Download All',
  onDownloadAllClick: noop,
  showDownloadAll: true
}

const AttachmentList = props => {
  const {
    children,
    className,
    downloadAllLabel,
    onDownloadAllClick,
    showDownloadAll,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-AttachmentList',
    className
  )

  const attachmentChildren = React.Children.toArray(children)
    .filter(child => child.type && child.type === Attachment)

  const childrenMarkup = attachmentChildren.length
    ? attachmentChildren.map((child, index) => {
      const { id, name } = child.props
      const key = id || `${name}-${index}`

      return (
        <Inline.Item className='c-AttachmentList__inlineListItem' key={key}>
          {React.cloneElement(child, {
            ...child.props
          })}
        </Inline.Item>
      )
    }) : null

  const downloadAllMarkup =
    (showDownloadAll && attachmentChildren.length > 1)
    ? (
      <Inline.Item className='c-AttachmentList__inlineListItemDownloadAll'>
        <Attachment
          name={downloadAllLabel}
          onClick={onDownloadAllClick}
          type='action'
        />
      </Inline.Item>
    ) : null

  return (
    <div className={componentClassName} {...rest}>
      <Inline className='c-AttachmentList__inlineList'>
        <Inline.Item>
          <Icon className='c-AttachmentList__icon' name='attachment' shade='faint' />
        </Inline.Item>
        {childrenMarkup}
        {downloadAllMarkup}
      </Inline>
    </div>
  )
}

AttachmentList.propTypes = propTypes
AttachmentList.defaultProps = defaultProps

export default AttachmentList
