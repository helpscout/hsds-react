import React, { PureComponent as Component } from 'react'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'
import { ImageUI } from './styles/Image.css.js'

class Image extends Component {
  render() {
    const { className, ...rest } = this.props

    const componentClassName = classNames('c-SkeletonImage', className)

    return <ImageUI {...rest} className={componentClassName} />
  }
}

namespaceComponent(COMPONENT_KEY.Image)(Image)

export default Image
