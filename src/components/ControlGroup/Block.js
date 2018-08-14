// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Item from './Item'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { ITEM_COMPONENT_KEY } from './utils'

type Props = {}

class Block extends Component<Props> {
  render() {
    return <Item {...this.props} isBlock />
  }
}

namespaceComponent(ITEM_COMPONENT_KEY)(Block)

export default Block
