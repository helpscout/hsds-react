// @flow
import React, { Component } from 'react'
import classNames from '../../utilities/classNames'
import Keys from '../../constants/Keys'

type Props = {
  uuid: string,
  className?: string,
  isOpen: boolean,
  setOpen: () => void,
}

class Title extends Component<Props> {
  static displayName = 'AccordionSectionTitle'

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleClick = e => {
    e && e.preventDefault()

    const { isOpen, setOpen, uuid } = this.props
    setOpen(uuid, !isOpen)
  }

  handleKeyPress = e => {
    if (e && (e.charCode === Keys.ENTER || e.charCode === Keys.SPACE)) {
      this.handleClick(e)
    }
  }

  render() {
    const { className, isOpen, setOpen, uuid, ...rest } = this.props

    const id = `accordion__section__title--${uuid}`
    const ariaControls = `accordion__section__body--${uuid}`
    const role = 'tab'
    const componentClassName = classNames(
      'c-Accordion__Section__Title',
      isOpen && 'is-open',
      className
    )

    return (
      <div
        aria-controls={ariaControls}
        aria-selected={isOpen}
        className={componentClassName}
        id={id}
        onClick={this.handleClick}
        onKeyPress={this.handleKeyPress}
        role={role}
        tabIndex="0"
        {...rest}
      />
    )
  }
}

export default Title
