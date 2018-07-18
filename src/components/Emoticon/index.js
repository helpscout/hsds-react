// @flow
import React from 'react'
import PropTypes from 'prop-types'
import EMOTICONS from './emoticons'
import css from './styles/Emoticon.css.js'
import styled from '../styled'
import classNames, { BEM } from '../../utilities/classNames'
import { sizeTypes } from './propTypes'
import type { EmotionSize } from './types'

type Props = {
  className?: string,
  center: boolean,
  clickable: boolean,
  isActive: boolean,
  inline: boolean,
  name: string,
  title?: string,
  size?: EmotionSize,
}

const Component = (props: Props) => {
  const {
    className,
    center,
    clickable,
    isActive,
    inline,
    name,
    title,
    size,
    ...rest
  } = props

  const src = { __html: EMOTICONS[name] }
  const componentClassName = classNames(
    'c-Emoticon',
    !clickable && 'is-noInteract',
    center && 'is-center',
    inline && 'is-inline',
    isActive && 'is-active',
    size && `is-${size}`,
    className
  )

  const iconClassName = classNames(
    BEM(componentClassName).element('icon'),
    'c-Emoticon__icon'
  )

  return (
    <span className={componentClassName} {...rest}>
      <span
        className={iconClassName}
        dangerouslySetInnerHTML={src}
        title={title}
      />
    </span>
  )
}

const Emoticon = styled(Component)(css)

Emoticon.defaultProps = {
  center: false,
  clickable: true,
  inline: false,
  isActive: true,
  name: 'happy',
  size: 'md',
  title: '',
}

Emoticon.displayName = 'Emoticon'

export default Emoticon
