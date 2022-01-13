import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Icon from '../Icon'
import { ButtonUI, ButtonWrapperUI, SplittedButtonUI } from './Condition.css'
import classNames from 'classnames'
import { isNodeWithinViewport } from '../../utilities/node'
import { noop } from '../../utilities/other'
import { linear, smoothScrollTo } from '../../utilities/smoothScroll'
import DropList from '../DropList/DropList'

const dropListItem = value => ({
  id: value,
  value,
  label: value.toUpperCase(),
})

const dropListItems = [dropListItem('or'), dropListItem('and')]

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
            items={dropListItems}
            tippyOptions={{ placement: 'bottom-start', offset: [0, 5] }}
            onSelect={({ value }) => onTypeChanged(value)}
            selection={dropListItems.find(item => item.id === type)}
            toggler={
              <SplittedButtonUI
                theme="green"
                outlined
                {...getValidProps(rest)}
                text={label}
                actionButtonProps={{ disabled: rest.disabled }}
                togglerButtonProps={{
                  kind: rest.disabled ? 'secondary' : 'tertiary',
                  flipChevron: true,
                }}
                size="xxs"
                onActionClick={this.handleOnClick}
              />
            }
          />
        ) : (
          <ButtonUI
            theme="green"
            outlined
            size={size}
            {...getValidProps(rest)}
            className={this.getClassName()}
            onClick={this.handleOnClick}
            prefixIcon="plus-small"
          >
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
}

export default AddButton
