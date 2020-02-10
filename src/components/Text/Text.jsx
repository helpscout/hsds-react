import React from 'react'
import PropTypes from 'prop-types'
import { TextSize, TextShade, UIState } from './Text.types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { TextUI } from './Text.css'

export interface Props {
  allCaps?: boolean
  block?: boolean
  children: any
  className?: string
  center?: boolean
  disableSelect?: boolean
  faint?: boolean
  isPlainLink: boolean
  lineHeightReset?: boolean
  lineHeightInherit?: boolean
  linkStyle: boolean
  muted?: boolean
  noUnderline: boolean
  noWrap?: boolean
  selector: string
  shade?: TextShade
  size?: TextSize
  state?: UIState
  subtle?: boolean
  truncate: boolean
  weight?: number | string
  wordWrap?: boolean
}

class Text extends React.PureComponent<Props> {
  public static defaultProps: Partial<Props> = {
    center: false,
    disableSelect: false,
    isPlainLink: false,
    linkStyle: false,
    noUnderline: false,
    selector: 'span',
    size: '13',
    state: 'default',
    truncate: false,
  }

  render() {
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
    } = this.props

    const componentClassName = classNames(
      'c-Text',
      allCaps && 'is-all-caps',
      block && 'is-block',
      center && 'is-center',
      disableSelect && 'is-disableSelect',
      faint && 'is-faint is-shade-faint',
      isPlainLink && 'is-plainLink',
      muted && 'is-muted is-shade-muted',
      noUnderline && 'is-noUnderline',
      noWrap && 'is-no-wrap',
      lineHeightInherit && 'is-lineHeightInherit',
      lineHeightReset && 'is-lineHeightReset',
      linkStyle && 'is-linkStyle',
      selector && `is-${selector}`,
      shade && `is-shade-${shade}`,
      size && `is-${size}`,
      state && `is-${state}`,
      subtle && 'is-subtle is-shade-subtle',
      truncate && 'is-truncate',
      weight && `is-${weight}`,
      wordWrap && 'is-wordWrap',
      className
    )

    return (
      <TextUI
        as={selector as any}
        {...getValidProps(rest)}
        className={componentClassName}
      >
        {children}
      </TextUI>
    )
  }
}

export default Text
