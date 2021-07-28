import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { noop } from '../../utilities/other'
import SearchableDropdown from '../SearchableDropdown'
import Button from '../Button'
import ControlGroup from '../ControlGroup'
import Icon from '../Icon'
import { OptionsTriggerButtonUI } from './SplitButton.css'

const defaultDropdownProps = {
  className: 'c-SplitButton__dropdown',
  direction: 'right',
  onTriggerClick: noop,
}

export class SplitButton extends React.PureComponent {
  static className = 'c-SplitButton'

  renderButton() {
    const { dropdownProps, ...rest } = this.props

    return <Button {...rest} className="c-SplitButton__button" />
  }

  renderDropdownTrigger() {
    const {
      disabled,
      dropdownProps: { onTriggerClick },
      kind,
      size,
      state,
    } = this.props

    return (
      <OptionsTriggerButtonUI
        className="c-SplitButton__dropdownTrigger"
        disabled={disabled}
        isLast
        kind={kind}
        onClick={onTriggerClick}
        size={size}
        state={state}
      >
        <Icon name="caret-down" size="14" />
      </OptionsTriggerButtonUI>
    )
  }

  renderDropdown() {
    const trigger = this.renderDropdownTrigger()
    const {
      disabled,
      dropdownProps: { onTriggerClick, ...dropdownPropsRest },
    } = this.props

    const props = {
      ...defaultDropdownProps,
      ...dropdownPropsRest,
      disabled,
      renderTrigger: trigger,
      triggerProps: {
        tabIndex: -1,
      },
      autoInput: true,
    }

    return <SearchableDropdown {...props} />
  }

  getClassName() {
    const { className } = this.props
    return classNames(SplitButton.className, className)
  }

  render() {
    const { 'data-cy': dataCy } = this.props

    return (
      <ControlGroup data-cy={dataCy} className={this.getClassName()}>
        <ControlGroup.Item>{this.renderButton()}</ControlGroup.Item>
        <ControlGroup.Item>{this.renderDropdown()}</ControlGroup.Item>
      </ControlGroup>
    )
  }
}

SplitButton.defaultProps = {
  buttonRef: noop,
  'data-cy': 'SplitButton',
  dropdownProps: {},
  disabled: false,
  kind: 'primary',
  onClick: noop,
  size: 'lg',
}

SplitButton.propTypes = {
  /** Retrieves the `button` DOM node. */
  buttonRef: PropTypes.func,
  /** The className of the component. */
  className: PropTypes.string,
  /** Disable the button so it can't be clicked. */
  disabled: PropTypes.bool,
  /** Any valid `Dropdown props`, including `items` */
  dropdownProps: PropTypes.any,
  /** The callback when the component is clicked. */
  onClick: PropTypes.func,
  /** Applies the specified style to the button.
   * 'primary': Blue button. Used for primary actions.
   * 'primaryAlt': Purple button. Used for primary actions.
   * 'secondary': White button with a border. Used for secondary actions.
   * 'secondaryAlt': White button with a green border. Used for secondary actions.
   * 'default': Borderless button. Used for subtle/tertiary actions.
   * 'link': Button that looks like a `Link`. Used for subtle/tertiary actions.
   */
  kind: PropTypes.string,
  /** Sets the size of the button. Can be one of "sm", "md" or "lg". */
  size: PropTypes.string,
  /** Applies state styles to the button.
   * 'danger': red.
   * 'success': green.
   * 'gray': gray.
   * 'warning': orange.
   */
  state: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default SplitButton
