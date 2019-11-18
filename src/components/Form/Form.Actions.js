import * as React from 'react'
import {
  ActionsUI,
  ActionsBlockUI,
  ActionsItemUI,
} from './styles/Form.Actions.css'
import { classNames } from '../../utilities/classNames'

export class Actions extends React.PureComponent {
  static className = 'c-FormActions'

  static defaultProps = {
    direction: 'right',
  }

  getClassName() {
    const { className, direction, primary, secondary, serious } = this.props

    return classNames(
      Actions.className,
      direction && `is-${direction}`,
      primary && 'withPrimary',
      secondary && 'withSecondary',
      serious && 'withSerious',
      className
    )
  }

  render() {
    const { primary, serious, secondary } = this.props

    return (
      <ActionsUI
        data-cy="FormActionsContent"
        className={this.getClassName()}
        role="toolbar"
      >
        <ActionsItemUI
          className="c-FormActions__primary"
          data-cy="FormActionsPrimaryItemWrapper"
        >
          {primary}
        </ActionsItemUI>
        {secondary && (
          <ActionsItemUI
            className="c-FormActions__secondary"
            data-cy="FormActionsSecondaryItemWrapper"
          >
            {secondary}
          </ActionsItemUI>
        )}
        {serious && <ActionsBlockUI className="c-FormActions__block" />}
        {serious && (
          <ActionsItemUI
            className="c-FormActions__serious"
            data-cy="FormActionsSeriousItemWrapper"
          >
            {serious}
          </ActionsItemUI>
        )}
      </ActionsUI>
    )
  }
}

export default Actions
