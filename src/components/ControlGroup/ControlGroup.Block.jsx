import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import ControlGroupItem from './ControlGroup.Item'
import { classNames } from '../../utilities/classNames'

class ControlGroupBlock extends React.PureComponent {
  render() {
    const { className, ...rest } = this.props
    const componentClassName = classNames('c-ControlGroupBlock', className)

    return (
      <ControlGroupItem
        {...getValidProps(rest)}
        className={componentClassName}
        isBlock
      />
    )
  }
}

ControlGroupBlock.propTypes = {
  className: PropTypes.string,
}

ControlGroupBlock.defaultProps = {
  'data-cy': 'ControlGroupBlock',
}

export default ControlGroupBlock
