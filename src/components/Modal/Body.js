// @flow
import 'resizey'
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Scrollable from '../Scrollable'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { COMPONENT_KEY } from './utils'
import { BodyUI } from './styles/Body.css.js'

type Props = {
  children?: any,
  className?: string,
  innerRef: (node: HTMLElement) => void,
  isSeamless: boolean,
  onScroll: (event: Event) => void,
  scrollable: boolean,
  scrollableRef: Function,
  scrollFade: boolean,
}

class Body extends Component<Props> {
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
  scrollableNode: ?HTMLElement

  componentDidMount() {
    this.positionCloseNode()
    this.node.addEventListener('resize', this.positionCloseNode)
  }

  componentWillUnmount() {
    this.scrollableNode = null
    this.node.removeEventListener('resize', this.positionCloseNode)
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
