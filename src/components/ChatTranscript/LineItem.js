// @flow
import React from 'react'
import Text from '../Text'
import classNames from '../../utilities/classNames'
import { newlineToHTML } from '../../utilities/strings'

type Props = {
  body?: string,
  children?: any,
  className?: string,
  createdAt?: string,
  timestamp?: string,
}

const LineItem = (props: Props) => {
  const { body, children, className, createdAt, timestamp, ...rest } = props

  const componentClassName = classNames('c-ChatTranscriptLineItem', className)

  const timestampMarkup = createdAt ? (
    <span className="c-ChatTranscriptLineItem__createdAt">
      {' '}
      at{' '}
      <span className="c-ChatTranscriptLineItem__timestamp" title={timestamp}>
        {createdAt}
      </span>
    </span>
  ) : null

  const contentMarkup = body ? (
    <span dangerouslySetInnerHTML={{ __html: newlineToHTML(body) }} />
  ) : (
    children
  )

  return (
    <div className={componentClassName} {...rest}>
      <Text
        className="c-ChatTranscriptLineItem__content"
        block
        lineHeightReset
        size="12"
      >
        {contentMarkup}
        {timestampMarkup}
      </Text>
    </div>
  )
}

LineItem.defaultProps = {
  body: '',
  createdAt: '',
}

LineItem.displayName = 'ChatTranscript.Item.LineItem'

export default LineItem
