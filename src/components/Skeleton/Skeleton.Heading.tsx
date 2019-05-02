import * as React from 'react'
import Text from './Skeleton.Text'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Skeleton.utils'

class Heading extends React.PureComponent<any> {
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
