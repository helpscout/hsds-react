import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Animate from '../Animate/index'
import BaseOverlay from '../Overlay/index'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { COMPONENT_KEY } from './Modal.utils'

type Props = {
  children?: any
  className?: string
  onClick: () => void
  isOpen: boolean
  overlayAnimationDelay: number
  overlayAnimationDuration: number
  overlayAnimationEasing: string
  overlayAnimationSequence: any
}

class Overlay extends React.PureComponent<Props> {
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

namespaceComponent(COMPONENT_KEY.Overlay)(Overlay)

export default Overlay
