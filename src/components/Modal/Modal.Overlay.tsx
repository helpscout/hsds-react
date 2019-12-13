import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Animate from '../Animate'
import BaseOverlay from '../Overlay'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ModalOverlayProps } from './Modal.types'

class Overlay extends React.PureComponent<ModalOverlayProps> {
  static displayName = 'Modal.Overlay'
  static defaultProps = {
    onClick: noop,
    isOpen: true,
    overlayAnimationDelay: 0,
    overlayAnimationDuration: 200,
    overlayAnimationEasing: 'ease',
    overlayAnimationSequence: 'fade',
  }

  render() {
    const {
      className,
      children,
      onClick,
      isOpen,
      overlayAnimationDelay,
      overlayAnimationDuration,
      overlayAnimationSequence,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-ModalOverlay',
      'c-Modal__Overlay', // Legacy
      className
    )

    return (
      <Animate
        delay={overlayAnimationDelay}
        duration={overlayAnimationDuration}
        in={isOpen}
        sequence={overlayAnimationSequence}
      >
        <BaseOverlay
          {...getValidProps(rest)}
          className={componentClassName}
          onClick={onClick}
          role="presentation"
        />
      </Animate>
    )
  }
}

export default Overlay
