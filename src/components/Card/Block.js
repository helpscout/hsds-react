// @flow
import React from 'react'
import PropTypes from 'prop-types'
import Scrollable from '../Scrollable'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { standardSizeTypes } from '../../constants/propTypes'
import type { UISize } from '../../constants/types'

type Props = {
  bgMuted: boolean,
  children?: any,
  className?: string,
  flex?: boolean,
  scrollable: boolean,
  scrollableRef: () => void,
  onScroll: () => void,
  flex: boolean,
  size?: UISize,
}

const Block = (props: Props) => {
  const {
    bgMuted,
    className,
    children,
    onScroll,
    scrollable,
    scrollableRef,
    flex,
    size,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Card__block',
    bgMuted && 'is-bg-muted',
    flex && 'is-flex',
    scrollable && 'is-scrollable',
    size && `c-Card__block--${size}`,
    className
  )

  const scrollableClassName = classNames(
    'c-Card__block',
    'c-Card__block--scrollable',
    flex && 'is-flex',
    scrollable && 'is-scrollable'
  )

  const contentMarkup = (
    <div className={componentClassName} {...rest}>
      {children}
    </div>
  )

  const componentMarkup = scrollable ? (
    <Scrollable
      className={scrollableClassName}
      onScroll={onScroll}
      scrollableRef={scrollableRef}
    >
      {contentMarkup}
    </Scrollable>
  ) : (
    contentMarkup
  )

  return componentMarkup
}

Block.defaultProps = {
  onScroll: noop,
  scrollableRef: noop,
}

export default Block
