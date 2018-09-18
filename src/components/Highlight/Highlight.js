// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'

type Props = {
  children?: any,
  className?: string,
}

class Highlight extends Component<Props> {
  static defaultProps = {}

  render() {
    const { className, children, ...rest } = this.props
    const componentClassName = classNames('c-Highlight', className)

    return (
      <div {...getValidProps(rest)} className={componentClassName}>
        Hallo
      </div>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(Highlight)

export default Highlight
