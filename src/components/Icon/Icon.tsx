import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import styled from '../styled'
import VisuallyHidden from '../VisuallyHidden'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import css from './styles/Icon.css'
import { COMPONENT_KEY, renameSVGIds } from './Icon.utils'
import { svgSet } from './Icon.utils'
import { IconProps } from './Icon.types'

const Icon = (props: IconProps) => {
  const {
    center,
    className,
    clickable,
    faint,
    ignoreClick,
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

  const src = { __html: renameSVGIds(svgSet[name], name) }
  const iconTitle = title || name

  const caretMarkup = withCaret ? (
    <span
      className="c-Icon__icon is-caret"
      dangerouslySetInnerHTML={{
        __html: renameSVGIds(svgSet['caret-down'], 'caret-down'),
      }}
      title="Caret"
    />
  ) : null

  return (
    <span
      aria-hidden
      {...getValidProps(rest)}
      className={componentClassName}
      onClick={onClick}
      data-icon-name={name}
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
  name: 'emoji',
  onClick: noop,
  offsetLeft: false,
  offsetRight: false,
  size: '20',
  withCaret: false,
}

namespaceComponent(COMPONENT_KEY)(Icon)

export default styled(Icon)(css)
