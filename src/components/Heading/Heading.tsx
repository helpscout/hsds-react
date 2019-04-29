import { HeadingSize } from './Heading.types'
import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import styled from '../styled'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import css from './Heading.css'
import { COMPONENT_KEY } from './Heading.utils'

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

    const element = React.createElement(
      selectorTag,
      {
        ...getValidProps(rest),
        className: componentClassName,
      },
      children
    )

    return element
  }
}

namespaceComponent(COMPONENT_KEY)(Heading)

export default styled(Heading)(css)
