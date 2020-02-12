import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import VisuallyHidden from '../VisuallyHidden'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { IconUI } from './Icon.css'
import { renameSVGIds } from './Icon.utils'
import { svgSet } from './Icon.utils'

const Icon = props => {
  const {
    center,
    className,
    clickable,
    faint,
    ignoreClick,
    isWithHiddenTitle,
    inline,
    muted,
    onClick,
    offsetLeft,
    offsetRight,
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
    offsetLeft && 'is-offsetLeft',
    offsetRight && 'is-offsetRight',
    muted && 'is-muted',
    shade && `is-${shade}`,
    state && `is-${state}`,
    subtle && 'is-subtle',
    size && `is-${size}`,
    withCaret && 'withCaret',
    className
  )

  const IconComponent = svgSet[name]
  const CaretComponent = svgSet['caret-down']
  const iconTitle = title || name

  const caretMarkup = withCaret ? (
    <span className="c-Icon__icon is-caret" title="Caret">
      {CaretComponent && <CaretComponent />}
    </span>
  ) : null

  return (
    <IconUI
      aria-hidden
      {...getValidProps(rest)}
      className={componentClassName}
      onClick={onClick}
      data-icon-name={name}
      data-cy="Icon"
    >
      <span className="c-Icon__icon" title={iconTitle}>
        {IconComponent && <IconComponent />}
      </span>
      {caretMarkup}
      {isWithHiddenTitle ? <VisuallyHidden>{iconTitle}</VisuallyHidden> : null}
    </IconUI>
  )
}

Icon.defaultProps = {
  center: false,
  clickable: false,
  ignoreClick: true,
  isWithHiddenTitle: true,
  muted: false,
  name: 'emoji',
  onClick: noop,
  offsetLeft: false,
  offsetRight: false,
  size: '20',
  withCaret: false,
}

export default Icon
