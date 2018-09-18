// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Icon from '../Icon'
import classNames from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'

type Props = {
  children?: any,
  className?: string,
}

class CopyInput extends Component<Props> {
  static defaultProps = {
    icon: 'chat',
  }

  render() {
    const { className, children, ...rest } = this.props
    const componentClassName = classNames('c-CopyInput', className)

    return (
      <div {...getValidProps(rest)} className={componentClassName}>
        Hallo
      </div>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(CopyInput)

export default CopyInput
