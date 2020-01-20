import * as React from 'react'
import Choice from '../Choice'
import { classNames } from '../../utilities/classNames'

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

export default Checkbox
