import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import ScrollLock from '../ScrollLock'
import classNames from '../../utilities/classNames'
import { getFadeTopStyles, getFadeBottomStyles } from '../../utilities/scrollFade'
import { noop } from '../../utilities/other'

export const propTypes = {
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
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
    /* istanbul ignore else */
    if (containerNode) {
      this.applyFadeStyles({
        currentTarget: containerNode
      })
    }
  }

  applyFadeStyles (event) {
    const { fade, fadeBottom } = this.props
    const offset = this.faderSize

    if (!fade && !fadeBottom) return

    if (fade && this.faderNodeTop) {
      const transformTop = getFadeTopStyles(event, offset)
      this.faderNodeTop.style.transform = transformTop
      this.applyFadeStyleOffset(this.faderNodeTop)
    }

    if (fadeBottom && this.faderNodeBottom) {
      const transformBottom = getFadeBottomStyles(event, offset)
      this.faderNodeBottom.style.transform = transformBottom
      this.applyFadeStyleOffset(this.faderNodeBottom)
    }
  }

  applyFadeStyleOffset (node) {
    /* istanbul ignore else */
    // Guard, just in case the node element is removed.
    if (node) {
      const offset = `${this.containerNode.offsetWidth - this.containerNode.scrollWidth}px`
      node.style.right = offset
    }
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
      contentClassName,
      fade,
      fadeBottom,
      onRef,
      onScroll,
      rounded,
      scrollableRef,
      isScrollLocked,
      ...rest
    } = this.props

    const handleOnScroll = this.handleOnScroll

    const componentClassName = classNames(
      'c-Scrollable',
      fade && 'has-fade',
      rounded && 'is-rounded',
      className
    )

    const componentContentClassName = classNames(
      'c-Scrollable__content',
      contentClassName
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
          transform: fadeBottom ? 'scaleY(1)' : 'scaleY(0)'
        }}
      />
    )

    return (
      <div className={componentClassName} {...rest}>
        {faderTopMarkup}
        <ScrollLock isDisabled={!isScrollLocked}>
          <div
            className={componentContentClassName}
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
