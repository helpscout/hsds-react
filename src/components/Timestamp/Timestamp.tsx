import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import Flexy from '../Flexy'
import Icon from '../Icon'
import Text from '../Text'
import Time from './Timestamp.Time'

type Props = {
  children?: any
  className?: string
  formatter?: () => string
  live?: boolean
  muted?: boolean
  read: boolean
  timestamp?: string | number
}

class Timestamp extends React.Component<Props> {
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
      <div className={componentClassName} {...rest}>
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
      </div>
    )
  }
}

export default Timestamp
