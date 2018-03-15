import React from 'react'
import PropTypes from 'prop-types'
import Link from '../Link'
import Text from '../Text'
import Chat from './Chat'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { bubbleTypes, providerContextTypes } from './propTypes'

export const propTypes = Object.assign({}, bubbleTypes, {
  filename: PropTypes.string,
  download: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onClick: PropTypes.func
})

const defaultProps = {
  download: true,
  onClick: noop
}

const contextTypes = providerContextTypes

const Attachment = (props, context) => {
  const {
    body,
    children,
    className,
    download,
    filename,
    onClick,
    size,
    url,
    type,
    ...rest
  } = props
  const {theme} = context

  const componentClassName = classNames(
    'c-MessageAttachment',
    theme && `is-theme-${theme}`,
    className
  )

  const title = download ? `Download ${filename}` : null

  const filenameMarkup = url ? (
    <Link
      className='c-MessageAttachment__link'
      download={download}
      href={url}
      title={title}
    >
      {filename}
    </Link>
  ) : (
    <Text className='c-MessageAttachment__text'>
      {filename}
    </Text>
  )

  return (
    <Chat
      {...rest}
      bubbleClassName='c-MessageMedia__bubble'
      className={componentClassName}
      icon='attachment'
      size='sm'
    >
      {filenameMarkup}
    </Chat>
  )
}

Attachment.propTypes = propTypes
Attachment.defaultProps = defaultProps
Attachment.contextTypes = contextTypes

export default Attachment
