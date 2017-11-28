import React from 'react'
import classNames from '../../utilities/classNames'
import Animate from '../Animate'
import Flexy from '../Flexy'
import HoverWrapper from '../HoverWrapper'
import Timestamp from '../Timestamp'

const Item = props => {
  const {
    children,
    className,
    isHovered,
    timestamp,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-TimelineItem',
    className
  )

  const timestampMarkup = timestamp ? (
    <Flexy.Item className='c-TimelineItem__timestamp'>
      <Animate in={isHovered} sequence='fadeIn' animateOnMount={false}>
        <Timestamp timestamp={timestamp} />
      </Animate>
    </Flexy.Item>
  ) : null

  return (
    <div className={componentClassName} {...rest} role='listitem'>
      <Flexy gap='md' just='left'>
        <Flexy.Item className='c-TimelineItem__block'>
          {children}
        </Flexy.Item>
        {timestampMarkup}
      </Flexy>
    </div>
  )
}

export default HoverWrapper(Item)
