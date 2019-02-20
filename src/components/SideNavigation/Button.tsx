import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './SideNavigation.utils'

import { ButtonUI, ButtonFooterUI } from './SideNavigation.css'

export interface Props {
  className?: string
}

export class Button extends React.PureComponent<Props> {
  static defaultProps = {}

  render() {
    const { children, className, ...rest } = this.props

    const componentClassName = classNames('c-SideNavigation__Button', className)

    return (
      <ButtonFooterUI
        version={2}
        {...getValidProps(rest)}
        className={componentClassName}
      >
        {children}
      </ButtonFooterUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Section)(Button)

export default Button
