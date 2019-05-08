import * as React from 'react'
import Collapsible from '../Collapsible'
import Centralize from '../Centralize'
import Button from './StatusBar.Button'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { StatusBarProps, StatusBarState } from './StatusBar.types'

class StatusBar extends React.PureComponent<StatusBarProps, StatusBarState> {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: props.isOpen,
    }
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  static defaultProps = {
    isOpen: false,
    onClick: noop,
    onClose: noop,
    onOpen: noop,
    closeOnClick: true,
    status: 'info',
    theme: 'light',
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen } = nextProps
    /* istanbul ignore else */
    if (isOpen !== undefined) {
      this.setState({ isOpen })
    }
  }

  handleOnClick() {
    const { closeOnClick, onClick } = this.props

    if (closeOnClick) {
      this.setState({ isOpen: false })
    }
    onClick()
  }

  render() {
    const {
      className,
      closeOnClick,
      children,
      isOpen: propsIsOpen,
      onClick,
      onOpen,
      onClose,
      status,
      theme,
      ...rest
    } = this.props
    const { isOpen } = this.state

    const handleOnClick = this.handleOnClick

    const componentClassName = classNames(
      'c-StatusBar',
      status && `is-${status}`,
      theme && `is-${theme}`,
      className
    )

    return (
      <Collapsible isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <Centralize
          className={componentClassName}
          onClick={handleOnClick}
          {...rest}
        >
          <div className="c-StatusBar__content">{children}</div>
        </Centralize>
      </Collapsible>
    )
  }
}

// TODO: fix typescript complains
// @ts-ignore
StatusBar.Button = Button

export default StatusBar
