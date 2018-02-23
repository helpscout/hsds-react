import React from 'react'
import PropTypes from 'prop-types'
import Attachment from '../Attachment'
import AttachmentList from '../AttachmentList'
import Flexy from '../Flexy'
import Heading from '../Heading'
import Text from '../Text'
import classNames from '../../utilities/classNames'
import {noop} from '../../utilities/other'

export const ITEM_TYPES = {
  lineItem: 'line_item',
  message: 'message',
  note: 'note'
}

export const propTypes = {
  action: PropTypes.string,
  attachments: PropTypes.array,
  author: PropTypes.object,
  body: PropTypes.string,
  chatId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  createdAt: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onAttachmentClick: PropTypes.func,
  onDownloadAllAttachmentClick: PropTypes.func,
  params: PropTypes.any,
  showDownloadAllAttachments: PropTypes.bool,
  type: PropTypes.oneOf([
    ITEM_TYPES.lineItem,
    ITEM_TYPES.message,
    ITEM_TYPES.note
  ]).isRequired
}

const defaultProps = {
  attachments: [],
  author: {
    name: 'Name'
  },
  createdAt: '',
  onAttachmentClick: noop,
  onDownloadAllAttachmentClick: noop,
  showDownloadAllAttachments: true,
  type: 'message'
}

const Item = props => {
  const {
    action,
    attachments,
    author,
    body,
    chatId,
    children,
    className,
    createdAt,
    id,
    onAttachmentClick,
    onDownloadAllAttachmentClick,
    params,
    showDownloadAllAttachments,
    type,
    ...rest
  } = props

  const maybeLineItem = type === ITEM_TYPES.lineItem
  const maybeHasAuthor = author && author.name
  const maybeNote = type === ITEM_TYPES.note

  const componentClassName = classNames(
    'c-ChatTranscriptItem',
    attachments.length && 'has-attachments',
    type && `is-${type}`,
    className
  )

  const contentClassName = classNames(
    'c-ChatTranscriptItem__content',
    type && `is-${type}`
  )

  const authorMarkup = maybeHasAuthor ? (
    <Flexy.Item>
      <Heading
        className='c-ChatTranscriptItem__author'
        lineHeightReset
        size='h5'
      >
        {author.name}
      </Heading>
    </Flexy.Item>
  ) : null

  const privateNoteMarkup = maybeNote ? (
    <Flexy.Item>
      <Text
        className='c-ChatTranscriptItem__privateNote'
        block
        lineHeightReset
        size='12'
      >
        Private Note
      </Text>
    </Flexy.Item>
  ) : null

  const timestampMarkup = createdAt ? (
    <Flexy.Item>
      <Text
        className='c-ChatTranscriptItem__timestamp'
        block
        lineHeightReset
        size='12'
      >
        {createdAt}
      </Text>
    </Flexy.Item>
  ) : null

  const headerMarkup = !maybeLineItem ? (
    <div className='c-ChatTranscriptItem__header'>
      <Flexy align='bottom' gap='xs' just='left'>
        {authorMarkup}
        {privateNoteMarkup}
        {timestampMarkup}
      </Flexy>
    </div>
  ) : null

  const contentMarkup = body ? (
    <div
      className={contentClassName}
      dangerouslySetInnerHTML={{__html: body}}
    />
  ) : (
    <div className={contentClassName}>
      {children}
    </div>
  )

  const attachmentMarkup = !maybeLineItem && attachments.length ? (
    <AttachmentList
      className='c-ChatTranscriptItem__attachmentList'
      onDownloadAllClick={onDownloadAllAttachmentClick}
      showDownloadAll={showDownloadAllAttachments}
    >
      {attachments.map((attachment, index) => {
        /* istanbul ignore next */
        // Enzyme can't test keys :s
        const key = attachment.id ? attachment.id : `attachment-${index}`

        return (
          <Attachment onClick={onAttachmentClick} key={key} {...attachment} />
        )
      })}
    </AttachmentList>
  ) : null

  return (
    <div className={componentClassName} {...rest}>
      <div className='c-ChatTranscriptItem__contentWrapper'>
        {headerMarkup}
        {contentMarkup}
        {attachmentMarkup}
      </div>
    </div>
  )
}

Item.propTypes = propTypes
Item.defaultProps = defaultProps
Item.displayName = 'ChatTranscript.Item'

export default Item
