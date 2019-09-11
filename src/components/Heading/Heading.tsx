import * as React from 'react'
import { HeadingSize } from './Heading.types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { HeadingUI } from './styles/Heading.css'

export interface Props {
  center: boolean
  className?: string
  children?: any
  disableSelect: boolean
  light?: boolean
  lineHeightInherit: boolean
  lineHeightReset: boolean
  linkStyle?: boolean
  noWrap: boolean
  selector?: string
  size: HeadingSize
  truncate: boolean
  weight?: number | string
  wordWrap: boolean
}

class Heading extends React.PureComponent<Props> {
  static defaultProps = {
    center: false,
    disableSelect: false,
    lineHeightInherit: false,
    lineHeightReset: false,
    linkStyle: false,
    truncate: false,
    noWrap: false,
    wordWrap: false,
  }

  render() {
    const {
      center,
      children,
      className,
      disableSelect,
      light,
      lineHeightInherit,
      lineHeightReset,
      linkStyle,
      noWrap,
      selector,
      size,
      truncate,
      weight,
      wordWrap,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-Heading',
      center && 'is-center',
      disableSelect && 'is-disableSelect',
      light && 'is-light',
      lineHeightInherit && 'is-lineHeightInherit',
      lineHeightReset && 'is-lineHeightReset',
      linkStyle && 'is-linkStyle',
      size && `is-${size}`,
      truncate && 'is-truncate',
      weight && `is-${weight}`,
      noWrap && 'is-noWrap',
      wordWrap && 'is-wordWrap',
      className
    )

    const selectorTag = selector || 'div'

    return (
      <HeadingUI
        as={selectorTag}
        {...getValidProps(rest)}
        className={componentClassName}
      >
        {children}
      </HeadingUI>
    )
  }
}

export default Heading
