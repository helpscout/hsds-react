import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ContentUI } from './Modal.css'
import ModalBody from './Modal.Body'

class ModalContent extends React.PureComponent {
  render() {
    const { className, children, scrollableRef, ...rest } = this.props
    const componentClassName = classNames('c-ModalContent', className)
    const childrenMarkup = React.Children.map(children, child => {
      if (child && child.type === ModalBody) {
        return React.cloneElement(child, {
          scrollableRef,
        })
      }

      return child
    })

    return (
      <ContentUI {...getValidProps(rest)} className={componentClassName}>
        {childrenMarkup}
      </ContentUI>
    )
  }
}

ModalContent.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  scrollableRef: PropTypes.func,
}

ModalContent.defaultProps = {
  'data-cy': 'ModalContent',
  scrollableRef: noop,
}

export default ModalContent
