import * as React from 'react'
import Choice from '../Choice'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Checkbox.utils'

type Props = {
  className?: string
}

class Checkbox extends React.PureComponent<Props> {
  render() {
    const { className, ...rest } = this.props

    const componentClassName = classNames('c-Checkbox')

    return (
      <Choice
        {...rest}
        className={componentClassName}
        componentID="Checkbox"
        type="checkbox"
      />
    )
  }
}

namespaceComponent(COMPONENT_KEY)(Checkbox)

export default propConnect('Checkbox')(Checkbox)
