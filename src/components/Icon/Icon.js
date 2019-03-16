// @flow
import type { IconSize } from './types'
import type { TextShade, UIState } from '../../constants/types'
import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import styled from '../styled'
import VisuallyHidden from '../VisuallyHidden'
import { ICONS } from '../../constants/global'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import css from './styles/Icon.css.js'
import { COMPONENT_KEY } from './utils'

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
  offsetLeft: boolean,
  offsetRight: boolean,
  shade?: TextShade,
  state?: UIState,
  size: IconSize,
  subtle?: boolean,
  title?: string,
  withCaret: boolean,
}

const renameSVGIds = (svgHtml, name) => {
  if (!svgHtml) {
    return svgHtml
  }
  const regexHash = new RegExp(`\#${name}`, 'gi')
  const regexQuote = new RegExp(`\"${name}`, 'gi')
  return svgHtml
    .replace(regexHash, `#hsds-icons-${name}`)
    .replace(regexQuote, `"hsds-icons-${name}`)
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

  const iconSet = global[ICONS] || {}

  const src = { __html: renameSVGIds(iconSet[name], name) }
  const iconTitle = title || name

  const caretMarkup = withCaret ? (
    <span
      className="c-Icon__icon is-caret"
      dangerouslySetInnerHTML={{
        __html: renameSVGIds(iconSet['caret-down'], 'caret-down'),
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
