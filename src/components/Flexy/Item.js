// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'
import { ItemUI } from './styles/Item.css.js'

type Props = {
  children?: any,
  className?: string,
  inline: boolean,
}

class Item extends Component<Props> {
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

namespaceComponent(COMPONENT_KEY)(Item)

export default Item
