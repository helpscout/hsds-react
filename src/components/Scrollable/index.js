import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'

export const propTypes = {
  className: PropTypes.string,
  fade: PropTypes.bool,
  onScroll: PropTypes.func,
  rounded: PropTypes.bool
}
const defaultProps = {
  onScroll: noop
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
        <div className='c-Scrollable__content' onScroll={handleOnScroll}>
          {children}
        </div>
      </div>
    )
  }
}

Scrollable.propTypes = propTypes
Scrollable.defaultProps = defaultProps

export default Scrollable
