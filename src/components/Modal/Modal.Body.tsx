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
    isSeamless: false,
    onScroll: noop,
    scrollable: true,
    scrollableRef: noop,
    scrollFade: true,
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
