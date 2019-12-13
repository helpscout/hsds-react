import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { ImageUI } from './styles/Skeleton.Image.css'

class Image extends React.PureComponent<any> {
  static displayName = 'Skeleton.Image'

  render() {
    const { className, ...rest } = this.props

    const componentClassName = classNames('c-SkeletonImage', className)

    return <ImageUI {...rest} className={componentClassName} />
  }
}

export default Image
