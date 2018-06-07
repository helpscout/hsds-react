import React, { Component } from 'react'
import classNames from '../../utilities/classNames'
import PropTypes from 'prop-types'
import Flexy from '../Flexy'
import Icon from '../Icon'
import Text from '../Text'
import Time from './Time'

export const propTypes = {
  formatter: PropTypes.func,
  live: PropTypes.bool,
  read: PropTypes.bool,
  muted: PropTypes.bool,
  timestamp: PropTypes.string,
}

const defaultProps = {
  read: false,
  timestamp: '9:41am',
}

class Timestamp extends Component {
  render() {
    const {
      children,
      className,
      formatter,
      live,
      muted,
      read,
      timestamp,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-Timestamp',
      muted && 'is-muted',
      className
    )

    const readMarkup = read ? (
      <Icon name="tick-large" size="12" faint title="Read" />
    ) : null

    return (
      <div className={componentClassName} {...rest}>
        <Flexy gap="xs" just="left">
          <Flexy.Item>
            <Text size="12" faint disableSelect noWrap>
              <Time formatter={formatter} live={live} timestamp={timestamp} />
            </Text>
          </Flexy.Item>
          <Flexy.Item>{readMarkup}</Flexy.Item>
        </Flexy>
      </div>
    )
  }
}

Timestamp.propTypes = propTypes
Timestamp.defaultProps = defaultProps
Timestamp.Time = Time

export default Timestamp
