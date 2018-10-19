import React, { PureComponent as Component } from 'react'
import Text from './Text'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'

class Heading extends Component {
  static defaultProps = {
    style: {},
    width: '70%',
  }

  render() {
    const { className, ...rest } = this.props

    const componentClassName = classNames('c-SkeletonHeading', className)

    return <Text {...rest} className={componentClassName} heading />
  }
}

namespaceComponent(COMPONENT_KEY.Heading)(Heading)

export default Heading
