// @flow
import React, { PureComponent as Component } from 'react'
import classNames from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { OptionTileUI } from './styles/OptionTile.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  children?: any,
  className?: string,
}

class OptionTile extends Component<Props> {
  render() {
    const { className, children, ...rest } = this.props
    const componentClassName = classNames('c-OptionTile', className)

    return <OptionTileUI {...rest} className={componentClassName} />
  }
}

namespaceComponent(COMPONENT_KEY)(OptionTile)

export default OptionTile
