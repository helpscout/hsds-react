import * as React from 'react'
import { ListBorder, ListGenericProps } from './List.types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { ItemUI } from './styles/List.css'

export interface Props extends ListGenericProps {
  borderStyle: ListBorder
  isListItem: boolean
}

export class Item extends React.PureComponent<Props> {
  static displayName = 'ListItem'

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

export default Item
