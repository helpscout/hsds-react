import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { CropUI } from './Avatar.css'

export const AvatarCrop = props => {
  const {
    className,
    children,
    isImageLoaded,
    withShadow,
    hasImage,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Avatar__crop',
    isImageLoaded && 'is-imageLoaded',
    withShadow && 'is-withShadow',
    className
  )

  return (
    <CropUI
      className={componentClassName}
      hasImage={hasImage}
      {...getValidProps(rest)}
    >
      {children}
    </CropUI>
  )
}

AvatarCrop.defaultProps = {
  animationDuration: 160,
  animationEasing: 'ease',
  'data-cy': AvatarCrop.displayName,
  isImageLoaded: false,
  withShadow: false,
}

export default AvatarCrop
