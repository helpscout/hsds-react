import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { ItemUI } from './styles/Flexy.Item.css'

export interface Props {
  children?: any
  className?: string
  inline: boolean
}

class Item extends React.PureComponent<Props> {
  static defaultProps = {
    inline: false,
  }

  render() {
    const { children, className, inline, ...rest } = this.props

    const componentClassName = classNames(
      'c-Flexy__item',
      inline ? 'is-inlineItem' : 'is-defaultItem',
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
