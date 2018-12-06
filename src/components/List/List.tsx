import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import Item from './Item'
import { COMPONENT_KEY } from './List.utils'

export interface Props {
  border: 'line' | 'dot' | null
  className?: string
  display: 'block' | 'flex'
  inlineSize: 'md' | 'sm' | 'xs'
  size: 'lg' | 'md' | 'sm' | 'xs' | null
  type: 'bullet' | 'inline' | 'number' | null
}

export class List extends React.PureComponent<Props> {
  static defaultProps = {
    border: '',
    display: 'block',
    inlineSize: 'md',
    role: 'list',
  }

  static Item = Item

  render() {
    const {
      border,
      children,
      className,
      display,
      inlineSize,
      size,
      type,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-List',
      border === 'dot' && 'c-List--dotted',
      border === 'line' && 'c-List--bordered',
      display && `is-display-${display}`,
      inlineSize && `is-inline-${inlineSize}`,
      size && `c-List--${size}`,
      type && `c-List--${type}`,
      className
    )

    const selectorTag =
      type === 'bullet' ? 'ul' : type === 'number' ? 'ol' : 'ul'

    return React.createElement(selectorTag, {
      className: componentClassName,
      children,
      ...getValidProps(rest),
    })
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY.List)(List)

export default PropConnectedComponent
