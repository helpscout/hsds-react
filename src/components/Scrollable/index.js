import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import ScrollLock from '../ScrollLock'

export const propTypes = {
  className: PropTypes.string,
  fade: PropTypes.bool,
  onScroll: PropTypes.func,
  rounded: PropTypes.bool,
  scrollableRef: PropTypes.func,
  isScrollLocked: PropTypes.bool
}
const defaultProps = {
  onScroll: noop,
  scrollableRef: noop,
  isScrollLocked: true
}

class Scrollable extends Component {
  constructor () {
    super()
    this.handleOnScroll = this.handleOnScroll.bind(this)
  }

  handleOnScroll (event) {
    const { onScroll } = this.props
    onScroll(event)
  }

  render () {
    const {
      children,
      className,
      fade,
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

    const fadeMarkup = fade ? (
      <div className='c-Scrollable__fade' />
    ) : null

    return (
      <div className={componentClassName} {...rest}>
        {fadeMarkup}
        <ScrollLock isDisabled={!isScrollLocked}>
          <div
            className='c-Scrollable__content'
            onScroll={handleOnScroll}
            ref={scrollableRef}
            >
            {children}
          </div>
        </ScrollLock>
      </div>
    )
  }
}

Scrollable.propTypes = propTypes
Scrollable.defaultProps = defaultProps

export default Scrollable
