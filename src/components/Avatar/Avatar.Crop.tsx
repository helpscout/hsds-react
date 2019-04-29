import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { CropUI } from './Avatar.css'

export const AvatarCrop = props => {
  const { className, children, hasImage, isImageLoaded, withShadow } = props

  const componentClassName = classNames(
    'c-Avatar__crop',
    isImageLoaded && 'is-imageLoaded',
    withShadow && 'is-withShadow',
    className
  )

  const styles = {
    backgroundColor: hasImage ? 'currentColor' : null,
  }

  return (
    <CropUI className={componentClassName} style={styles}>
      {children}
    </CropUI>
  )
}

AvatarCrop.defaultProps = {
  hasImage: false,
  isImageLoaded: false,
  withShadow: false,
}

export default AvatarCrop
