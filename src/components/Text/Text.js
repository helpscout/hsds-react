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
  lineHeightReset?: boolean,
  linkStyle?: boolean,
  muted?: boolean,
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
    weight && `is-${weight}`,
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

namespaceComponent(COMPONENT_KEY)(Text)

export default styled(Text)(css)
