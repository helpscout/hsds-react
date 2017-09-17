import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'

export const propTypes = {
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func
}

const defaultProps = {
  onBlur: noop,
  onClick: noop,
  onFocus: noop
}

class Item extends Component {
  constructor () {
    super()
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleOnFocus = this.handleOnFocus.bind(this)
    this.hasMenu = false
  }

  handleOnBlur (event, reactEvent) {
    const { onBlur } = this.props
    onBlur(event, reactEvent, this)
  }

  handleOnFocus (event, reactEvent) {
    const { onFocus } = this.props
    onFocus(event, reactEvent, this)
  }

  render () {
    const {
      children,
      className,
      onBlur,
      onFocus,
      itemRef,
      onClick,
      ...rest
    } = this.props

    const handleOnBlur = this.handleOnBlur
    const handleOnFocus = this.handleOnFocus

    const componentClassName = classNames(
      'c-DropdownItem',
      className
    )

    return (
      <li className={componentClassName} {...rest}>
        <a
          className='c-DropdownItem__link'
          onBlur={handleOnBlur}
          onClick={onClick}
          onFocus={handleOnFocus}
          tabIndex={0}
          ref={node => { this.node = node }}
        >
          {children}
        </a>
      </li>
    )
  }
}

Item.propTypes = propTypes
Item.defaultProps = defaultProps

export default Item
