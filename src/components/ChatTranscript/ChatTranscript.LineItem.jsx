import React from 'react'
import PropTypes from 'prop-types'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { escapeHTML, newlineToHTML } from '../../utilities/strings'
import compose from '@helpscout/react-utils/dist/compose'

import { LineItemUI } from './ChatTranscript.css'

const enhanceBody = compose(newlineToHTML, escapeHTML)

const LineItem = props => {
  const {
    body,
    children,
    className,
    createdAt,
    isBodySafe,
    timestamp,
    ...rest
  } = props

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

  const contentHTML = isBodySafe ? body : enhanceBody(body)

  const contentMarkup = contentHTML ? (
    <span
      dangerouslySetInnerHTML={{
        __html: contentHTML,
      }}
    />
  ) : (
    children
  )

  return (
    <LineItemUI className={componentClassName} {...rest}>
      <Text
        className="c-ChatTranscriptLineItem__content"
        block
        lineHeightReset
        size="12"
      >
        {contentMarkup}
        {timestampMarkup}
      </Text>
    </LineItemUI>
  )
}

LineItem.propTypes = {
  body: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  createdAt: PropTypes.string,
  isBodySafe: PropTypes.bool,
  timestamp: PropTypes.string,
}

LineItem.defaultProps = {
  body: '',
  createdAt: '',
}

LineItem.displayName = 'ChatTranscript.Item.LineItem'

export default LineItem
