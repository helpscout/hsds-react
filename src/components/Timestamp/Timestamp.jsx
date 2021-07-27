import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import Flexy from '../Flexy'
import Icon from '../Icon'
import Text from '../Text'
import Time from './Timestamp.Time'
import { TimestampUI } from './Timestamp.css'

class Timestamp extends React.Component {
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
      <TimestampUI {...getValidProps(rest)} className={componentClassName}>
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

Timestamp.defaultProps = {
  'data-cy': 'Timestamp',
  live: false,
  read: false,
  timestamp: '9:41am',
}

Timestamp.propTypes = {
  children: PropTypes.any,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** A function to format the timestamp, which defaults to returning the timestamp string. */
  formatter: PropTypes.func,
  /** Enables the internal ticking mechanism to live update the timestamp. Default `false`. */
  live: PropTypes.bool,
  /** Determines if the Message is read. */
  read: PropTypes.bool,
  /** Timestamp for the Message. */
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  muted: PropTypes.bool,
}

export default Timestamp
