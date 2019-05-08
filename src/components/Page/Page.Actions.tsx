import { ActionsDirection } from './Page.types'
import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import {
  ActionsUI,
  ActionsBlockUI,
  ActionsItemUI,
} from './styles/Page.Actions.css'
import { COMPONENT_KEY } from './Page.utils'
import { PageActionsProps } from './Page.types'

class Actions extends React.PureComponent<PageActionsProps> {
  static defaultProps = {
    direction: 'right',
  }

  render() {
    const {
      className,
      direction,
      primary,
      serious,
      secondary,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-PageActions',
      direction && `is-${direction}`,
      primary && 'withPrimary',
      secondary && 'withSecondary',
      serious && 'withSerious',
      className
    )

    return (
      <ActionsUI
        {...getValidProps(rest)}
        className={componentClassName}
        role="toolbar"
      >
        <ActionsItemUI className="c-PageActions__primary">
          {primary}
        </ActionsItemUI>
        <ActionsItemUI className="c-PageActions__secondary">
          {secondary}
        </ActionsItemUI>
        <ActionsBlockUI className="c-PageActions__block" />
        <ActionsItemUI className="c-PageActions__serious">
          {serious}
        </ActionsItemUI>
      </ActionsUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Actions)(Actions)

export default Actions
