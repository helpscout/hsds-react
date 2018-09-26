// @flow
import React, { PureComponent as Component } from 'react'
import Scrollable from '../Scrollable'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { COMPONENT_KEY } from './utils'
import { BodyUI } from './styles/Body.css.js'

type Props = {
  children?: any,
  className?: string,
  isSeamless: boolean,
  onScroll: (event: Event) => void,
  scrollable: boolean,
  scrollableRef: Function,
  scrollFade: boolean,
}

class Body extends Component<Props> {
  static defaultProps = {
    isSeamless: false,
    onScroll: noop,
    scrollable: true,
    scrollableRef: noop,
    scrollFade: true,
  }

  static contextTypes = {
    positionCloseNode: noop,
  }

  scrollableNode: ?HTMLElement

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
      <BodyUI className={componentClassName} {...rest}>
        {childrenContent}
      </BodyUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Body)(Body)

export default Body
