import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ContentUI } from './Modal.css'
import Body from './Modal.Body'

class ModalContent extends React.PureComponent {
  static displayName = 'ModalContent'
  render() {
    const { className, children, scrollableRef, ...rest } = this.props
    const componentClassName = classNames('c-ModalContent', className)
    const childrenMarkup = React.Children.map(children, child => {
      if (child && child.type === Body) {
        return React.cloneElement(child, {
          scrollableRef,
        })
      }

      return child
    })

    return (
      <ContentUI className={componentClassName} {...rest}>
        {childrenMarkup}
      </ContentUI>
    )
  }
}

ModalContent.defaultProps = {
  scrollableRef: () => undefined,
}

ModalContent.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  scrollableRef: PropTypes.func,
}

export default ModalContent
