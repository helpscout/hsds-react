// @flow
import React from 'react'
import classNames from '../../utilities/classNames'
import type { Sizes } from './types'
import type { TextShades, UIStates } from '../../constants/types'

type Props = {
  allCaps?: boolean,
  block?: boolean,
  children: any,
  className?: string,
  center?: boolean,
  disableSelect?: boolean,
  faint?: boolean,
  lineHeightReset?: boolean,
  linkStyle?: boolean,
  muted?: boolean,
  noWrap?: boolean,
  selector: string,
  shade?: TextShades,
  size?: Sizes,
  state?: UIStates,
  subtle?: boolean,
  truncate?: boolean,
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
    lineHeightReset,
    linkStyle,
    muted,
    noWrap,
    selector,
    shade,
    size,
    state,
    subtle,
    truncate,
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
    muted && 'is-muted',
    noWrap && 'is-no-wrap',
    lineHeightReset && 'is-line-height-reset',
    linkStyle && 'is-linkStyle',
    selector && `is-${selector}`,
    shade && `is-${shade}`,
    size && `is-${size}`,
    state && `is-${state}`,
    subtle && 'is-subtle',
    truncate && 'is-truncate',
    wordWrap && 'is-word-wrap',
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
  linkStyle: false,
  selector: 'span',
  size: 'default',
  state: 'default',
  truncate: false,
}

export default Text
