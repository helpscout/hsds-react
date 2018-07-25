// @flow
import React, { PureComponent as Component } from 'react'
import Scrollable from '../Scrollable'
import styled from '../styled'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import css from './styles/Body.css.js'

type Props = {
  children?: any,
  className?: string,
  isSeamless: boolean,
  onScroll: (event: Event) => void,
  scrollable: boolean,
  scrollableRef: Function,
  scrollFade: boolean,
}

export const propTypes = {}

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

  static displayName = 'Modal.Body'

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
        scrollableRef={node => {
          this.scrollableNode = node
          scrollableRef(node)
        }}
      >
        {children}
      </Scrollable>
    ) : (
      children
    )

    return (
      <div className={componentClassName} {...rest}>
        {childrenContent}
      </div>
    )
  }
}

export default styled(Body)(css)
