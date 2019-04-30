import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import { RadioKind } from './Radio.types'
import Choice from '../Choice'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Radio.utils'

type Props = {
  className?: string
  kind: RadioKind
}

class Radio extends React.PureComponent<Props> {
  static defaultProps = {
    kind: 'default',
  }

  render() {
    const { className, kind, ...rest } = this.props

    const componentClassName = classNames('c-Radio', className)

    return (
      <Choice
        {...rest}
        className={componentClassName}
        componentID="Radio"
        kind={kind}
        type="radio"
      />
    )
  }
}

namespaceComponent(COMPONENT_KEY)(Radio)

export default propConnect(COMPONENT_KEY)(Radio)
