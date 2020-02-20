import React from 'react'
import PropTypes from 'prop-types'
import Condition from '../Condition'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { AddButtonWrapperUI } from './ConditionList.css'

export class AddButton extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    innerRef: PropTypes.func,
    onClick: PropTypes.func,
    scrollDuration: PropTypes.number,
    scrollOffset: PropTypes.number,
  }

  static defaultProps = {
    innerRef: noop,
    onClick: noop,
    scrollDuration: 300,
    scrollOffset: 200,
  }

  static className = 'c-ConditionListAddButton'

  node

  getClassName() {
    const { className } = this.props
    return classNames(AddButton.className, className)
  }

  render() {
    const { className, ...rest } = this.props

    return (
      <AddButtonWrapperUI data-cy="ConditionListAddButtonWrapper">
        <Condition.AddButton
          {...rest}
          className={this.getClassName()}
          type="and"
          data-cy="ConditionListAddButton"
        />
      </AddButtonWrapperUI>
    )
  }
}

export default AddButton
