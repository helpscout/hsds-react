import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import { default as Collapsible, collapsibleTypes } from '../Collapsible'
import Centralize from '../Centralize'
import Button from './Button'
import classNames from '../../utilities/classNames.ts'
import { themeTypes } from './propTypes'
import { noop } from '../../utilities/other'
import { statusTypes } from '../../constants/propTypes'

export const propTypes = Object.assign({}, collapsibleTypes, {
  closeOnClick: PropTypes.bool,
  statusTypes,
  themeTypes,
})

const defaultProps = {
  isOpen: false,
  onClick: noop,
  onClose: noop,
  onOpen: noop,
  closeOnClick: true,
  status: 'info',
  theme: 'light',
}

class StatusBar extends Component {
  constructor(props) {
    super()
    this.state = {
      isOpen: props.isOpen,
    }
    this.handleOnClick = this.handleOnClick.bind(this)
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

StatusBar.propTypes = propTypes
StatusBar.defaultProps = defaultProps
StatusBar.displayName = 'StatusBar'
StatusBar.Button = Button

export default StatusBar
