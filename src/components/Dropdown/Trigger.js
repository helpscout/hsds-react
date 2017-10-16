import React, {PureComponent as Component} from 'react'
import classNames from '../../utilities/classNames'
import Button from '../Button'
import Icon from '../Icon'
import { dropdownDirectionTypes } from './propTypes'

export const propTypes = {
  direction: dropdownDirectionTypes
}
const defaultProps = {
  direction: 'down'
}

class Trigger extends Component {
  render () {
    const {
      isActive,
      children,
      className,
      direction,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-DropdownTrigger',
      className
    )

    const iconMarkup = (
      <Icon
        className='c-DropdownTrigger__icon'
        inline
        muted
        name={`caret-${direction}`}
        size='14'
      />
    )

    return (
      <Button
        buttonRef={node => { this.node = node }}
        className={componentClassName}
        isActive={isActive}
        tabIndex={0}
        {...rest}
      >
        {children}
        {iconMarkup}
      </Button>
    )
  }
}

Trigger.propTypes = propTypes
Trigger.defaultProps = defaultProps

export default Trigger
