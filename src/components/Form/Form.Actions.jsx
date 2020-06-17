import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { ActionsUI, ActionsBlockUI, ActionsItemUI } from './Form.Actions.css'
import { classNames } from '../../utilities/classNames'

export class FormActions extends React.PureComponent {
  static className = 'c-FormActions'

  getClassName() {
    const { cancel, className, destroy, direction, save } = this.props

    return classNames(
      FormActions.className,
      cancel && 'withCancel',
      className,
      destroy && 'withDestroy',
      direction && `is-${direction}`,
      save && 'withSave'
    )
  }

  render() {
    const { cancel, destroy, save, ...rest } = this.props

    return (
      <ActionsUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        role="toolbar"
      >
        <ActionsItemUI
          className="c-FormActions__save"
          data-cy="FormActionsSaveItemWrapper"
        >
          {save}
        </ActionsItemUI>
        {cancel && (
          <ActionsItemUI
            className="c-FormActions__cancel"
            data-cy="FormActionsCancelItemWrapper"
          >
            {cancel}
          </ActionsItemUI>
        )}
        {destroy && <ActionsBlockUI className="c-FormActions__block" />}
        {destroy && (
          <ActionsItemUI
            className="c-FormActions__destroy"
            data-cy="FormActionsDestroyItemWrapper"
          >
            {destroy}
          </ActionsItemUI>
        )}
      </ActionsUI>
    )
  }
}

FormActions.propTypes = {
  direction: PropTypes.string,
}

FormActions.defaultProps = {
  direction: 'right',
  'data-cy': 'FormActionsContent',
}

export default FormActions
