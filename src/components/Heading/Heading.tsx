import { HeadingSize } from './types'
import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import styled from '../styled'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import css from './styles/Heading.css'
import { COMPONENT_KEY } from './utils'

export interface Props {
  center: boolean
  className?: string
  children?: any
  disableSelect: boolean
  light?: boolean
  lineHeightReset?: boolean
  linkStyle?: boolean
  selector?: string
  size: HeadingSize
  weight?: number | string
}

class Heading extends React.PureComponent<Props> {
  static defaultProps = {
    center: false,
    disableSelect: false,
    linkStyle: false,
  }

  render() {
    const {
      center,
      children,
      className,
      disableSelect,
      light,
      lineHeightReset,
      linkStyle,
      selector,
      size,
      weight,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-Heading',
      center && 'is-center',
      disableSelect && 'is-disableSelect',
      light && 'is-light',
      lineHeightReset && 'is-line-height-reset',
      linkStyle && 'is-linkStyle',
      size && `is-${size}`,
      weight && `is-${weight}`,
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
