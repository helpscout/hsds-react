import * as React from 'react'
import Actions from './Form.Actions'
import { classNames } from '../../utilities/classNames'

export class Form extends React.PureComponent {
  static Actions = Actions

  render() {
    const { children, className } = this.props

    const componentClassName = classNames('c-Form', className)

    return <form className={componentClassName}>{children}</form>
  }
}

export default Form
