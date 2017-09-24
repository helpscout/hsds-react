import React, {PureComponent as Component} from 'react'
import classNames from '../../utilities/classNames'
import Button from '../Button'

class Trigger extends Component {
  render () {
    const {
      isActive,
      children,
      className,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-DropdownTrigger',
      className
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
      </Button>
    )
  }
}

export default Trigger
