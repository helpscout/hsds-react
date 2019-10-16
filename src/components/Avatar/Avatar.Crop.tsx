import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { CropUI } from './styles/Avatar.css'

export const AvatarCrop = props => {
  const { className, children, isImageLoaded, withShadow, hasImage } = props

  const componentClassName = classNames(
    'c-Avatar__crop',
    isImageLoaded && 'is-imageLoaded',
    withShadow && 'is-withShadow',
    className
  )

  return (
    <CropUI className={componentClassName} hasImage={hasImage}>
      {children}
    </CropUI>
  )
}

AvatarCrop.defaultProps = {
  animationDuration: 160,
  animationEasing: 'ease',
  isImageLoaded: false,
  withShadow: false,
}

AvatarCrop.displayName = 'AvatarCrop'

export default AvatarCrop
