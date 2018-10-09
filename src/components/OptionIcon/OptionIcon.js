// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { OptionIconUI } from './styles/OptionIcon.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  children?: any,
  className?: string,
  icon: string,
  title?: string,
}

class OptionIcon extends Component<Props> {
  static defaultProps = {
    icon: 'chat',
  }

  render() {
    const { className, children, icon, title, ...rest } = this.props
    const componentClassName = classNames('c-OptionIcon', className)

    return (
      <OptionIconUI {...getValidProps(rest)} className={componentClassName}>
        <Icon className="c-OptionIcon__icon" name={icon} title={title} />
      </OptionIconUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(OptionIcon)

export default OptionIcon
