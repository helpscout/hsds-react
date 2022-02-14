import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Animate from '../Animate'
import BaseOverlay from '../Overlay'
import classNames from 'classnames'

class ModalOverlay extends React.PureComponent {
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

function noop() {}

ModalOverlay.defaultProps = {
  'data-cy': 'ModalOverlay',
  onClick: noop,
  isOpen: true,
  isHsApp: false,
  overlayAnimationDelay: 0,
  overlayAnimationDuration: 200,
  overlayAnimationEasing: 'ease',
  overlayAnimationSequence: 'fade',
}

ModalOverlay.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Callback on click */
  onClick: PropTypes.func,
  isHsApp: PropTypes.bool,
  /** Shows/hides the component. */
  isOpen: PropTypes.bool,
  /** Custom animation delay */
  overlayAnimationDelay: PropTypes.number,
  /** Custom animation duration */
  overlayAnimationDuration: PropTypes.number,
  /** Custom animation easing */
  overlayAnimationEasing: PropTypes.string,
  /** Custom animation sequence */
  overlayAnimationSequence: PropTypes.any,
}

export default ModalOverlay
