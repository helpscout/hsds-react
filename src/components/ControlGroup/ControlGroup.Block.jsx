import React from 'react'
import PropTypes from 'prop-types'
import Item from './ControlGroup.Item'
import { classNames } from '../../utilities/classNames'

class Block extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
  }
  static displayName = 'ControlGroupBlock'
  render() {
    const { className } = this.props

    const componentClassName = classNames('c-ControlGroupBlock', className)

    return <Item {...this.props} className={componentClassName} isBlock />
  }
}

export default Block
