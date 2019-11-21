import * as React from 'react'
import { ActionsUI, ActionsBlockUI, ActionsItemUI } from './Form.Actions.css'
import { classNames } from '../../utilities/classNames'

export class Actions extends React.PureComponent {
  static className = 'c-FormActions'

  static defaultProps = {
    direction: 'right',
  }

  getClassName() {
    const { cancel, className, destroy, direction, save } = this.props

    return classNames(
      Actions.className,
      cancel && 'withCancel',
      className,
      destroy && 'withDestroy',
      direction && `is-${direction}`,
      save && 'withSave'
    )
  }

  render() {
    const { cancel, destroy, save } = this.props

    return (
      <ActionsUI
        data-cy="FormActionsContent"
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

export default Actions
