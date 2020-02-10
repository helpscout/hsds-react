import React from 'react'
import PropTypes from 'prop-types'
import Choice from '../Choice'
import { classNames } from '../../utilities/classNames'

class Checkbox extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
  }
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
