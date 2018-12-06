import * as React from 'react'
import { ListBorder, ListGenericProps } from './List.types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { COMPONENT_KEY } from './List.utils'
import { ItemUI } from './List.css'

export interface Props extends ListGenericProps {
  borderStyle: ListBorder
  isListItem: boolean
}

export class Item extends React.PureComponent<Props> {
  static defaultProps = {
    isListItem: false,
    role: 'listitem',
  }

  render() {
    const {
      borderStyle,
      children,
      className,
      isListItem,
      size,
      type,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-List__item',
      borderStyle && 'is-bordered',
      borderStyle && `is-border-${borderStyle}`,
      isListItem && 'is-listItem',
      size && `is-${size}`,
      type && `is-${type}`,
      className
    )

    return (
      <ItemUI {...getValidProps(rest)} className={componentClassName}>
        {children}
      </ItemUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY.Item)(Item)

export default PropConnectedComponent
