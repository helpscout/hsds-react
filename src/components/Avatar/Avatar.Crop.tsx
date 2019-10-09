import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { CropUI } from './styles/Avatar.css'

export const AvatarCrop = props => {
  const { className, children, isImageLoaded, withShadow } = props

  const componentClassName = classNames(
    'c-Avatar__crop',
    isImageLoaded && 'is-imageLoaded',
    withShadow && 'is-withShadow',
    className
  )

  return (
    <CropUI className={componentClassName} isImageLoaded={isImageLoaded}>
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
