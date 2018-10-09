// @flow
import React from 'react'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { CloseButtonSize } from './types'

type Props = {
  className?: string,
  children?: any,
  onBlur: (event: Event) => void,
  onClick: (event: Event) => void,
  onFocus: (event: Event) => void,
  seamless?: boolean,
  size?: CloseButtonSize,
  title?: string,
}

const defaultProps = {
  onBlur: noop,
  onClick: noop,
  onFocus: noop,
  title: 'Close',
}

const CloseButton = (props: Props) => {
  const { children, className, seamless, size, title, ...rest } = props

  const isTiny = size === 'tiny'

  const componentClassName = classNames(
    'c-CloseButton',
    seamless && 'is-seamless',
    size && `is-${size}`,
    className
  )

  const iconName = !isTiny ? 'cross-large' : 'cross-small'

  return (
    <button
      className={componentClassName}
      {...rest}
      aria-label="Close"
      title={title}
    >
      <Icon
        center
        className="c-CloseButton__icon"
        ignoreClick
        name={iconName}
        title="Close"
      />
    </button>
  )
}

CloseButton.defaultProps = {
  onBlur: noop,
  onClick: noop,
  onFocus: noop,
  title: 'Close',
}

export default CloseButton
