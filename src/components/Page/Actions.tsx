import { ActionsDirection } from './types'
import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { ActionsUI, ActionsBlockUI, ActionsItemUI } from './styles/Actions.css'
import { COMPONENT_KEY } from './utils'

export interface Props {
  className?: string
  direction?: ActionsDirection
  primary?: any
  secondary?: any
  serious?: any
}

class Actions extends React.PureComponent<Props> {
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
