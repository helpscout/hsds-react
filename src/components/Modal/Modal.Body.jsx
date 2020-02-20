import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Scrollable from '../Scrollable'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { BodyUI } from './Modal.css'

class Body extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    innerRef: PropTypes.func,
    isScrollLocked: PropTypes.bool,
    isSeamless: PropTypes.bool,
    onScroll: PropTypes.func,
    scrollable: PropTypes.bool,
    scrollableRef: PropTypes.func,
    scrollFade: PropTypes.bool,
  }
  static displayName = 'Modal.Body'

  static defaultProps = {
    innerRef: noop,
    isScrollLocked: true,
    isSeamless: false,
    onScroll: noop,
    scrollable: true,
    scrollableRef: noop,
    scrollFade: true,
  }

  static contextTypes = {
    positionCloseNode: noop,
  }

  node
  scrollableNode

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
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-ModalBody',
      isSeamless && 'is-seamless',
      scrollable ? 'is-scrollable' : 'is-not-scrollable',
      className
    )

    const childrenContent = scrollable ? (
      <Scrollable
        className="c-ModalBody__scrollable"
        contentClassName="c-ModalBody__scrollableContent"
        fade={scrollFade}
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

export default Body
