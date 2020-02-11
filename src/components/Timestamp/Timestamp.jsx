import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import Flexy from '../Flexy'
import Icon from '../Icon'
import Text from '../Text'
import Time from './Timestamp.Time'
import { TimestampUI } from './Timestamp.css'

class Timestamp extends React.Component {
  static defaultProps = {
    live: false,
    read: false,
    timestamp: '9:41am',
  }
  static Time = Time

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
      <TimestampUI className={componentClassName} {...rest}>
        <Flexy gap="xs" just="left">
          <Flexy.Item>
            <Text size="12" faint disableSelect noWrap>
              <Time
                formatter={formatter}
                live={live}
                timestamp={`${timestamp}`}
              />
            </Text>
          </Flexy.Item>
          <Flexy.Item>{readMarkup}</Flexy.Item>
        </Flexy>
      </TimestampUI>
    )
  }
}

Timestamp.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  formatter: PropTypes.func,
  live: PropTypes.bool,
  muted: PropTypes.bool,
  read: PropTypes.bool,
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Timestamp
