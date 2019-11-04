import * as React from 'react'
import { getEasingTiming } from '../../utilities/easing'
import { classNames } from '../../utilities/classNames'
import { CropUI } from './styles/Avatar.css'

export const AvatarCrop = props => {
  const {
    animationDuration,
    animationEasing,
    className,
    children,
    hasImage,
    isImageLoaded,
    withShadow,
  } = props

  const componentClassName = classNames(
    'c-Avatar__crop',
    isImageLoaded && 'is-imageLoaded',
    withShadow && 'is-withShadow',
    className
  )

  const styles = {
    transition: `background-color ${animationDuration}ms ${getEasingTiming(
      animationEasing
    )}`,
  }

  return (
    // @ts-ignore
    <CropUI className={componentClassName} hasImage={hasImage} style={styles}>
      {children}
    </CropUI>
  )
}

AvatarCrop.defaultProps = {
  animationDuration: 160,
  animationEasing: 'ease',
  hasImage: false,
  isImageLoaded: false,
  withShadow: false,
}

export default AvatarCrop
