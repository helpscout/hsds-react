import * as React from 'react'
import { StickyActionsUI } from './styles/Page.StickyActions.css'
import { PageStickyActionsProps, PageStickyActionsState } from './Page.types'
import { noop } from '../../utilities/other'
import { isIntersectionObserverSupported } from './Page.utils'

class StickyActions extends React.PureComponent<
  PageStickyActionsProps,
  PageStickyActionsState
> {
  node: HTMLElement
  observer: IntersectionObserver

  static className = 'c-PageStickyActions'

  static defaultProps = {
    ref: noop,
    offset: 10,
    onStickyStart: noop,
    onStickyEnd: noop,
  }

  state = {
    isSticky: true,
  }

  componentDidMount() {
    this.observerStart()
  }

  componentWillUnmount() {
    this.observerStop()
  }

  observerStart() {
    /* istanbul ignore next */
    if (!isIntersectionObserverSupported()) return

    const { offset } = this.props
    const observerOptions = {
      root: null,
      rootMargin: `0px 0px ${offset * -1}px 0px`,
      threshold: 1.0,
    }
    this.observer = new IntersectionObserver(
      this.handleOnIntersect,
      observerOptions
    )
    this.observer.observe(this.node)
  }

  observerStop() {
    /* istanbul ignore next */
    if (!isIntersectionObserverSupported()) return

    this.observer.unobserve(this.node)
    this.observer.disconnect()
  }

  handleOnIntersect = changes => {
    const { intersectionRatio } = changes[0]
    const isSticky = intersectionRatio !== 1

    this.updateSticky(isSticky)
  }

  updateSticky = (isSticky: boolean) => {
    const { onStickyStart, onStickyEnd } = this.props

    /* istanbul ignore else */
    if (this.state.isSticky !== isSticky) {
      this.setState({ isSticky })

      isSticky ? onStickyStart(this.node) : onStickyEnd(this.node)
    }
  }

  setNodeRef = node => {
    this.node = node
    this.props.ref(node)
  }

  render() {
    return (
      <StickyActionsUI ref={this.setNodeRef as any}>
        {this.props.children}
      </StickyActionsUI>
    )
  }
}

export default StickyActions
