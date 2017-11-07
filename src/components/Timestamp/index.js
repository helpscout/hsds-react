import React from 'react'
import classNames from '../../utilities/classNames'
import PropTypes from 'prop-types'
import Flexy from '../Flexy'
import Icon from '../Icon'
import Text from '../Text'

export const propTypes = {
  read: PropTypes.bool,
  timestamp: PropTypes.string
}

const defaultProps = {
  read: false,
  timestamp: '9:41am'
}

const Timestamp = props => {
  const {
    children,
    className,
    read,
    timestamp,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Timestamp',
    className
  )

  const readMarkup = read ? (
    <Icon name='tick-large' size='12' faint title='Read' />
  ) : null

  return (
    <div className={componentClassName} {...rest}>
      <Flexy gap='xs' just='left'>
        <Flexy.Item>
          <Text size='12' faint disableSelect>
            <time dateTime={timestamp}>{timestamp}</time>
          </Text>
        </Flexy.Item>
        <Flexy.Item>
          {readMarkup}
        </Flexy.Item>
      </Flexy>
    </div>
  )
}

Timestamp.propTypes = propTypes
Timestamp.defaultProps = defaultProps

export default Timestamp
