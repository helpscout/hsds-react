// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import {
  ActionsUI,
  ActionsBlockUI,
  ActionsItemUI,
} from './styles/Actions.css.js'

type ActionsDirection = 'left' | 'right'

type Props = {
  className?: string,
  direction?: ActionsDirection,
  primary?: any,
  secondary?: any,
  serious?: any,
}

class Actions extends Component<Props> {
  static defaultProps = {
    direction: 'right',
  }

  static displayName = 'Page.Actions'

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
      <ActionsUI className={componentClassName} {...getValidProps(rest)}>
        <ActionsItemUI>{primary}</ActionsItemUI>
        <ActionsItemUI>{secondary}</ActionsItemUI>
        <ActionsBlockUI />
        <ActionsItemUI>{serious}</ActionsItemUI>
      </ActionsUI>
    )
  }
}

export default Actions
