import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Animate from '../Animate'
import BaseOverlay from '../Overlay'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'

class Overlay extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    isHsApp: PropTypes.bool,
    isOpen: PropTypes.bool,
    overlayAnimationDelay: PropTypes.number,
    overlayAnimationDuration: PropTypes.number,
    overlayAnimationEasing: PropTypes.string,
    overlayAnimationSequence: PropTypes.any,
  }

  static displayName = 'Modal.Overlay'
  static defaultProps = {
    onClick: noop,
    isOpen: true,
    isHsApp: false,
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
      isHsApp,
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
          isHsApp={isHsApp}
          className={componentClassName}
          onClick={onClick}
          role="presentation"
        />
      </Animate>
    )
  }
}

export default Overlay
