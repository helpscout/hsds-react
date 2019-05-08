import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Skeleton.utils'
import { ImageUI } from './styles/Skeleton.Image.css'

class Image extends React.PureComponent<any> {
  render() {
    const { className, ...rest } = this.props

    const componentClassName = classNames('c-SkeletonImage', className)

    return <ImageUI {...rest} className={componentClassName} />
  }
}

namespaceComponent(COMPONENT_KEY.Image)(Image)

export default Image
