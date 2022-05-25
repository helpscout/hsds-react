import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import Scrollable from '../Scrollable'
import classNames from 'classnames'
import { BodyUI } from './Modal.css'

function noop() {}

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
      v2 && 'v2',
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

ModalBody.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Whether to use `ScrollLock` or not. Default `true` */
  isScrollLocked: PropTypes.bool,
  /** Applies seamless styles to the component. */
  isSeamless: PropTypes.bool,
  /** Callback function when inner Scrollable is scrolled. */
  onScroll: PropTypes.func,
  /** Whether the content should be scrollable */
  scrollable: PropTypes.bool,
  /** Enables the upper fade-to-white styles. Default `true`. */
  scrollFade: PropTypes.bool,
  /** Retrieves the scrollable node. */
  scrollableRef: PropTypes.func,
  innerRef: PropTypes.func,
  /** Version of the Modal styles to apply (version 2 is the new standard, version 1 is legacy). */
  version: PropTypes.number,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default ModalBody
