import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Scrollable from '../Scrollable'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { BodyUI } from './Modal.css'

class ModalBody extends React.PureComponent {
  node
  scrollableNode
  static displayName = 'ModalBody'

  componentDidMount() {
    this.positionCloseNode()
  }

  componentWillUnmount() {
    this.scrollableNode = null
  }

  positionCloseNode = () => {
    if (this.context.positionCloseNode) {
      this.context.positionCloseNode(this.scrollableNode)
    }
  }

  setScrollableRef = node => {
    this.scrollableNode = node
    this.props.scrollableRef(node)
  }

  setNodeRef = node => {
    this.node = node
    this.props.innerRef(node)
  }

  render() {
    const {
      className,
      children,
      isScrollLocked,
      isSeamless,
      onScroll,
      scrollable,
      scrollFade,
      scrollableRef,
      version,
      ...rest
    } = this.props

    // version 2 should always render seamlessly
    // and allow a bottom fade for overflow content
    const v2 = version === 2
    const seamless = isSeamless || v2
    const fadeBottom = v2

    const componentClassName = classNames(
      'c-ModalBody',
      v2 && 'is-v2',
      seamless && 'is-seamless',
      scrollable ? 'is-scrollable' : 'is-not-scrollable',
      className
    )

    const childrenContent = scrollable ? (
      <Scrollable
        className="c-ModalBody__scrollable"
        contentClassName="c-ModalBody__scrollableContent"
        fade={scrollFade}
        fadeBottom={fadeBottom}
        isScrollLocked={isScrollLocked}
        rounded
        onScroll={onScroll}
        scrollableRef={this.setScrollableRef}
      >
        {children}
      </Scrollable>
    ) : (
      children
    )

    return (
      <BodyUI
        {...getValidProps(rest)}
        className={componentClassName}
        ref={this.setNodeRef}
      >
        {childrenContent}
      </BodyUI>
    )
  }
}

ModalBody.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  innerRef: PropTypes.func,
  isScrollLocked: PropTypes.bool,
  isSeamless: PropTypes.bool,
  onScroll: PropTypes.func,
  scrollable: PropTypes.bool,
  scrollableRef: PropTypes.func,
  scrollFade: PropTypes.bool,
  version: PropTypes.number,
}

ModalBody.defaultProps = {
  'data-cy': 'ModalBody',
  innerRef: noop,
  isScrollLocked: true,
  isSeamless: false,
  onScroll: noop,
  scrollable: true,
  scrollableRef: noop,
  scrollFade: true,
  version: 1,
}

ModalBody.contextTypes = {
  positionCloseNode: noop,
}

export default ModalBody
