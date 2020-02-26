import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Scrollable from '../Scrollable'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { COMPONENT_KEY } from './Modal.utils'
import { BodyUI } from './styles/Modal.Body.css'
import { ModalBodyProps } from './Modal.types'

class Body extends React.PureComponent<ModalBodyProps> {
  static defaultProps = {
    innerRef: noop,
    isScrollLocked: true,
    isSeamless: false,
    onScroll: noop,
    scrollable: true,
    scrollableRef: noop,
    scrollFade: true,
    version: 1,
  }

  static contextTypes = {
    positionCloseNode: noop,
  }

  node: HTMLElement
  scrollableNode: HTMLElement | null

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

  setScrollableRef = (node: HTMLElement) => {
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
        innerRef={this.setNodeRef}
      >
        {childrenContent}
      </BodyUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Body)(Body)

export default Body
