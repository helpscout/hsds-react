// @flow
import type { IconSize } from './types'
import type { TextShade, UIState } from '../../constants/types'
import React from 'react'
import ICONS from './icons'
import styled from '../styled'
import VisuallyHidden from '../VisuallyHidden'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import css from './styles/Icon.css.js'

type Props = {
  center: boolean,
  className?: string,
  clickable: boolean,
  ignoreClick: boolean,
  faint?: boolean,
  inline?: boolean,
  muted?: boolean,
  name: string,
  onClick: () => void,
  shade?: TextShade,
  state?: UIState,
  size: IconSize,
  subtle?: boolean,
  title?: string,
  withCaret: boolean,
}

const Icon = (props: Props) => {
  const {
    center,
    className,
    clickable,
    faint,
    ignoreClick,
    inline,
    muted,
    onClick,
    name,
    shade,
    size,
    state,
    subtle,
    title,
    withCaret,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Icon',
    center && 'is-center',
    clickable && 'is-clickable',
    !clickable && ignoreClick && 'is-noInteract',
    faint && 'is-faint',
    inline && 'is-inline',
    name && `is-iconName-${name}`,
    muted && 'is-muted',
    shade && `is-${shade}`,
    state && `is-${state}`,
    subtle && 'is-subtle',
    size && `is-${size}`,
    withCaret && 'withCaret',
    className
  )

  const src = { __html: ICONS[name] }
  const iconTitle = title || name

  const caretMarkup = withCaret ? (
    <span
      className="c-Icon__icon is-caret"
      dangerouslySetInnerHTML={{ __html: ICONS['caret-down'] }}
      title="Caret"
    />
  ) : null

  return (
    <span
      className={componentClassName}
      onClick={onClick}
      data-icon-name={name}
      {...rest}
    >
      <span
        className="c-Icon__icon"
        dangerouslySetInnerHTML={src}
        title={iconTitle}
      />
      {caretMarkup}
      <VisuallyHidden>{iconTitle}</VisuallyHidden>
    </span>
  )
}

Icon.defaultProps = {
  center: false,
  clickable: false,
  ignoreClick: true,
  muted: false,
  name: null,
  onClick: noop,
  size: '20',
  withCaret: false,
}

export default styled(Icon)(css)
