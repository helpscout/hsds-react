import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Icon from '../Icon'
import { ButtonUI, ButtonWrapperUI } from './Condition.css'
import { classNames } from '../../utilities/classNames'
import { isNodeWithinViewport } from '../../utilities/node'
import { noop } from '../../utilities/other'
import { linear, smoothScrollTo } from '../../utilities/smoothScroll'
import DropList from '../DropList/DropList'
import { SplitButton } from '../DropList/DropList.togglers'

const dropdownItem = value => ({
  id: value,
  value,
  label: value.toUpperCase(),
})

class AddButton extends React.PureComponent {
  static className = 'c-ConditionAddButton'

  node

  getClassName() {
    const { className, isBorderless, type } = this.props

    const isAnd = type.toLowerCase() === 'and'
    const label = isAnd ? 'and' : 'or'

    return classNames(
      AddButton.className,
      isBorderless && 'is-borderless',
      `is-${label}`,
      className
    )
  }

  handleOnClick = event => {
    this.props.onClick(event)
    this.scrollIntoView()
  }

  scrollIntoView = () => {
    const { scrollOffset: offset, scrollDuration: duration } = this.props

    // Guard in case component because unmounted during the click event.
    if (!this.node) return

    const isVisible = isNodeWithinViewport({ node: this.node, offset })
    const position = offset + window.scrollY

    // Can't easily be tested in JSDOM due to DOM calculations.
    if (isVisible) return

    smoothScrollTo({
      node: window,
      position,
      direction: 'y',
      duration,
      timingFunction: linear,
    })
  }

  setNodeRef = node => (this.node = node)

  render() {
    const {
      className,
      isBorderless,
      type,
      onTypeChanged,
      selectableType,
      showPlusIcon,
      onClick,
      ...rest
    } = this.props
    const isAnd = type.toLowerCase() === 'and'
    const align = isAnd ? 'center' : 'left'
    const iconSize = isAnd ? 24 : 20
    const label = isAnd ? 'and' : 'or'
    const size = isAnd ? 'sm' : 'xxs'

    return (
      <ButtonWrapperUI align={align} ref={this.setNodeRef}>
        {selectableType ? (
          <DropList
            items={[dropdownItem('or'), dropdownItem('and')]}
            tippyOptions={{ placement: 'bottom-start', offset: [0, 5] }}
            onSelect={({ value }) => onTypeChanged(value)}
            toggler={
              <SplitButton
                {...getValidProps(rest)}
                text={label}
                kind="tertiary"
                actionButtonProps={{ disabled: rest.disabled }}
                togglerButtonProps={{
                  kind: rest.disabled ? 'secondary' : 'tertiary',
                }}
                size={'xxs'}
                onActionClick={this.handleOnClick}
              />
            }
          />
        ) : (
          <ButtonUI
            {...getValidProps(rest)}
            className={this.getClassName()}
            kind="tertiary"
            onClick={this.handleOnClick}
            size={size}
          >
            {showPlusIcon && (
              <Icon
                name="plus-small"
                isWithHiddenTitle={false}
                size={iconSize}
              />
            )}
            {label}
          </ButtonUI>
        )}
      </ButtonWrapperUI>
    )
  }
}

AddButton.defaultProps = {
  'data-cy': 'ConditionAddButton',
  isBorderless: false,
  onClick: noop,
  onTypeChanged: noop,
  scrollDuration: 300,
  scrollOffset: 200,
  type: 'or',
  selectableType: false,
  showPlusIcon: true,
}

AddButton.propTypes = {
  /** The className of the component. */
  className: PropTypes.string,
  /** Retrieve the inner DOM node. */
  innerRef: PropTypes.func,
  /** Renders a white border. */
  isBorderless: PropTypes.bool,
  /** Callback when component is clicked. */
  onClick: PropTypes.func,
  /** Time (ms) it takes to scroll into view. */
  scrollDuration: PropTypes.number,
  /** Amount (px) used to calculate scrolling into view. */
  scrollOffset: PropTypes.number,
  /** The operator. */
  type: PropTypes.oneOf(['and', 'or']),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Indicate if it is possible to select type for a Button ('and' or 'or') */
  selectableType: PropTypes.bool,
  /** Callback when type has changed */
  onTypeChanged: PropTypes.func,
  /** Indicate if Plus Icon should be displayed next to text */
  showPlusIcon: PropTypes.bool,
}

export default AddButton
