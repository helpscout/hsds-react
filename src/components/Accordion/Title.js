// @flow
import React, { Component } from 'react'
import classNames from '../../utilities/classNames'
import { Icon, Flexy } from '../..'
import Keys from '../../constants/Keys'
import { TitleUI } from './styles/Section.css'

type Props = {
  uuid: string,
  className?: string,
  isOpen: boolean,
  setOpen: () => void,
  size?: string,
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
    const {
      className,
      children,
      isOpen,
      setOpen,
      size,
      uuid,
      ...rest
    } = this.props

    const id = `accordion__section__title--${uuid}`
    const ariaControls = `accordion__section__body--${uuid}`
    const role = 'tab'
    const componentClassName = classNames(
      'c-Accordion__Section__Title',
      isOpen && 'is-open',
      size && size === 'xs' && 'is-xs',
      size && size === 'sm' && 'is-sm',
      size && size === 'md' && 'is-md',
      className
    )

    const iconProps = {
      faint: !isOpen,
      name: isOpen ? 'caret-up' : 'caret-down',
    }

    return (
      <TitleUI
        aria-controls={ariaControls}
        aria-selected={isOpen}
        className={componentClassName}
        id={id}
        onClick={this.handleClick}
        onKeyPress={this.handleKeyPress}
        role={role}
        tabIndex="0"
        {...rest}
      >
        <Flexy>
          <Flexy.Block>{children}</Flexy.Block>
          <Flexy.Item>
            <Icon {...iconProps} />
          </Flexy.Item>
        </Flexy>
      </TitleUI>
    )
  }
}

export default Title
