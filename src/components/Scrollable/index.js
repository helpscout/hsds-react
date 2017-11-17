import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import ScrollLock from '../ScrollLock'
import classNames from '../../utilities/classNames'
import { hasContentOverflowY } from '../../utilities/node'
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
    if (!fade && !fadeBottom) return

    const scrollNode = event.currentTarget
    const offset = this.faderSize
    const { clientHeight, scrollHeight, scrollTop } = scrollNode
    const scrollAmount = clientHeight + scrollTop + offset

    requestAnimationFrame(() => {
      if (fade) {
        if (scrollTop > 0) {
          const size = scrollTop < offset ? scrollTop : offset
          this.faderNodeTop.style.transform = `scaleY(${size / offset})`
        } else {
          this.faderNodeTop.style.transform = `scaleY(0)`
        }
      }

      if (fadeBottom) {
        if (scrollAmount >= scrollHeight) {
          this.faderNodeBottom.style.tranform = `scaleY(${(-1 * (scrollHeight - scrollAmount)) / offset})`
        } else {
          this.faderNodeBottom.style.transform = `scaleY(1)`
        }
      }
    })
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
