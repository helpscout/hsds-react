import * as React from 'react'
import Button from '../Button'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { DropdownDirection } from './Dropdown.types'

type Props = {
  children?: any
  className?: string
  direction: DropdownDirection
  isActive: boolean
  onClick: (event: Event) => void
}

class Trigger extends React.PureComponent<Props> {
  static defaultProps = {
    children: 'Dropdown',
    direction: 'down',
    onClick: noop,
    isActive: false,
  }
  node: HTMLElement

  /* istanbul ignore next */
  // Tested, but Istanbul isn't picking it up
  handleOnClick = (event: Event) => {
    event && event.preventDefault()
    this.props.onClick(event)
  }

  render() {
    const { isActive, children, className, direction, ...rest } = this.props
    const handleOnClick = this.handleOnClick
    const child =
      typeof children !== 'object' ? children : React.Children.only(children)

    const componentClassName = classNames(
      'c-DropdownTrigger',
      direction && `is-${direction}`,
      isActive && 'is-active',
      className
    )

    const iconMarkup = (
      <Icon
        className="c-DropdownTrigger__icon"
        inline
        muted
        name={`caret-${direction}`}
        size="14"
      />
    )

    const triggerMarkup =
      typeof child !== 'object' ? (
        <Button
          buttonRef={node => {
            this.node = node
          }}
          className={componentClassName}
          isActive={isActive}
          onClick={handleOnClick}
          tabIndex={0}
          {...rest}
        >
          {children}
          {iconMarkup}
        </Button>
      ) : (
        React.cloneElement(child, {
          ...rest,
          className: componentClassName,
          onClick: handleOnClick,
          tabIndex: 0,
        })
      )

    return triggerMarkup
  }
}

export default Trigger
