// @flow
import type { Sizes } from './types'
import type { TextShade, UIState } from '../../constants/types'
import React from 'react'
import styled from '../styled'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import css from './styles/Text.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  allCaps?: boolean,
  block?: boolean,
  children: any,
  className?: string,
  center?: boolean,
  disableSelect?: boolean,
  faint?: boolean,
  isPlainLink: boolean,
  lineHeightReset?: boolean,
  lineHeightInherit?: boolean,
  linkStyle: boolean,
  muted?: boolean,
  noUnderline: boolean,
  noWrap?: boolean,
  selector: string,
  shade?: TextShade,
  size?: Sizes,
  state?: UIState,
  subtle?: boolean,
  truncate?: boolean,
  weight?: number | string,
  wordWrap?: boolean,
}

const Text = (props: Props) => {
  const {
    allCaps,
    block,
    children,
    className,
    center,
    disableSelect,
    faint,
    isPlainLink,
    lineHeightInherit,
    lineHeightReset,
    linkStyle,
    muted,
    noUnderline,
    noWrap,
    selector,
    shade,
    size,
    state,
    subtle,
    truncate,
    weight,
    wordWrap,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Text',
    allCaps && 'is-all-caps',
    block && 'is-block',
    center && 'is-center',
    disableSelect && 'is-disableSelect',
    faint && 'is-faint',
    isPlainLink && 'is-plainLink',
    muted && 'is-muted',
    noUnderline && 'is-noUnderline',
    noWrap && 'is-no-wrap',
    lineHeightInherit && 'is-lineHeightInherit',
    lineHeightReset && 'is-lineHeightReset',
    linkStyle && 'is-linkStyle',
    selector && `is-${selector}`,
    shade && `is-${shade}`,
    size && `is-${size}`,
    state && `is-${state}`,
    subtle && 'is-subtle',
    truncate && 'is-truncate',
    weight && `is-${weight}`,
    wordWrap && 'is-wordWrap',
    className
  )

  return React.createElement(
    selector,
    {
      ...rest,
      className: componentClassName,
    },
    children
  )
}

Text.defaultProps = {
  center: false,
  disableSelect: false,
  isPlainLink: false,
  linkStyle: false,
  noUnderline: false,
  selector: 'span',
  size: 'default',
  state: 'default',
  truncate: false,
}

namespaceComponent(COMPONENT_KEY)(Text)

export default styled(Text)(css)
