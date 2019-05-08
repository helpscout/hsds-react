import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { CodeUI } from './styles/Code.css'
import { COMPONENT_KEY } from './Code.utils'

export interface Props {
  className?: string
  children?: any
}

class Code extends React.PureComponent<Props> {
  render() {
    const { className, children, ...rest } = this.props

    const componentClassName = classNames('c-Code', className)

    return (
      <CodeUI {...getValidProps(rest)} className={componentClassName}>
        {children}
      </CodeUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(Code)

export default Code
