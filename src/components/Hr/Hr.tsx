import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { HrUI } from './styles/Hr.css'
import { COMPONENT_KEY } from './Hr.utils'

export type HrSize = 'md' | 'sm' | 'xs' | 'none'

export interface Props {
  children?: any
  className?: string
  role: string
  size: HrSize
}

class Hr extends React.PureComponent<Props> {
  static defaultProps = {
    role: 'separator',
    size: 'md',
  }

  render() {
    const { className, children, role, size, ...rest } = this.props
    const componentClassName = classNames(
      'c-Hr',
      size && `is-${size}`,
      className
    )

    return (
      <HrUI
        {...getValidProps(rest)}
        className={componentClassName}
        role={role}
      />
    )
  }
}

namespaceComponent(COMPONENT_KEY)(Hr)

export default propConnect(COMPONENT_KEY)(Hr)
