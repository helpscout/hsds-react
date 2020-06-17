import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Collapsible from '../Collapsible'
import Button from './StatusBar.Button'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { StatusBarUI } from './StatusBar.css'

class StatusBar extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: props.isOpen,
    }
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isOpen } = nextProps

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
        <StatusBarUI
          {...getValidProps(rest)}
          className={componentClassName}
          onClick={handleOnClick}
        >
          <div className="c-StatusBar__content">{children}</div>
        </StatusBarUI>
      </Collapsible>
    )
  }
}

StatusBar.Button = Button

StatusBar.propTypes = {
  closeOnClick: PropTypes.bool,
  status: PropTypes.oneOf(['error', 'info', 'success', 'warning', '', null]),
  theme: PropTypes.oneOf(['light', 'bold']),
  onClick: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
}

StatusBar.defaultProps = {
  'data-cy': 'StatusBar',
  isOpen: false,
  onClick: noop,
  onClose: noop,
  onOpen: noop,
  closeOnClick: true,
  status: 'info',
  theme: 'light',
}

export default StatusBar
