import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import ScrollLock from '../ScrollLock'
import classNames from '../../utilities/classNames'
import { hasContentOverflowY } from '../../utilities/node'
import getScrollbarWidth from '../../vendors/getScrollbarWidth'
import { getFadeTopStyles, getFadeBottomStyles } from '../../utilities/scrollFade'
import { noop, requestAnimationFrame } from '../../utilities/other'

export const propTypes = {
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  fade: PropTypes.bool,
  fadeBottom: PropTypes.bool,
  onScroll: PropTypes.func,
  rounded: PropTypes.bool,
  scrollableRef: PropTypes.func,
  isScrollLocked: PropTypes.bool
}
const defaultProps = {
  backgroundColor: 'white',
  fade: false,
  fadeBottom: false,
  onScroll: noop,
  scrollableRef: noop,
  isScrollLocked: true
}

const scrollbarWidth = getScrollbarWidth()

class Scrollable extends Component {
  constructor () {
    super()
    this.state = {
      shouldFadeOnMount: false
    }
    this.faderSize = 28
    this.faderNodeTop = null
    this.faderNodeBottom = null
    this.containerNode = null
    this.handleOnScroll = this.handleOnScroll.bind(this)
    this.scrollbarWidth = scrollbarWidth
  }

  componentDidMount () {
    this.applyFade()
  }

  applyFade () {
    const containerNode = this.containerNode

    this.setState({
      shouldFadeOnMount: hasContentOverflowY(containerNode)
    })
  }

  applyFadeStyles (event) {
    const { fade, fadeBottom } = this.props
    const offset = this.faderSize

    if (!fade && !fadeBottom) return

    if (fade) {
      const transformTop = getFadeTopStyles(event, offset)
      requestAnimationFrame(() => {
        this.faderNodeTop.style.transform = transformTop
        this.applyFadeStyleOffset(this.faderNodeTop)
      })
    }

    if (fadeBottom) {
      const transformBottom = getFadeBottomStyles(event, offset)
      requestAnimationFrame(() => {
        this.faderNodeBottom.style.transform = transformBottom
        this.applyFadeStyleOffset(this.faderNodeBottom)
      })
    }
  }

  applyFadeStyleOffset (node) {
    const offset = (hasContentOverflowY(this.containerNode))
      ? /* istanbul ignore next */ `${this.scrollbarWidth}px`
      : 0
    node.style.right = offset
  }

  handleOnScroll (event) {
    const { onScroll } = this.props
    this.applyFadeStyles(event)
    onScroll(event)
  }

  render () {
    const {
      backgroundColor,
      children,
      className,
      fade,
      fadeBottom,
      onRef,
      onScroll,
      rounded,
      scrollableRef,
      isScrollLocked,
      ...rest
    } = this.props

    const { shouldFadeOnMount } = this.state

    const handleOnScroll = this.handleOnScroll

    const componentClassName = classNames(
      'c-Scrollable',
      fade && 'has-fade',
      rounded && 'is-rounded',
      className
    )

    const faderTopMarkup = (
      <div
        className='c-Scrollable__fader is-top'
        ref={node => (this.faderNodeTop = node)}
        role='presentation'
        style={{
          color: backgroundColor
        }}
      />
    )

    const faderBottomMarkup = (
      <div
        className='c-Scrollable__fader is-bottom'
        ref={node => (this.faderNodeBottom = node)}
        role='presentation'
        style={{
          color: backgroundColor,
          transform: fadeBottom && shouldFadeOnMount ? 'scaleY(1)' : 'scaleY(0)'
        }}
      />
    )

    return (
      <div className={componentClassName} {...rest}>
        {faderTopMarkup}
        <ScrollLock isDisabled={!isScrollLocked}>
          <div
            className='c-Scrollable__content'
            onScroll={handleOnScroll}
            ref={node => {
              this.containerNode = node
              scrollableRef(node)
            }}
            >
            {children}
          </div>
        </ScrollLock>
        {faderBottomMarkup}
      </div>
    )
  }
}

Scrollable.propTypes = propTypes
Scrollable.defaultProps = defaultProps

export default Scrollable
