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

ControlGroupBlock.defaultProps = {
  'data-cy': 'ControlGroupBlock',
}

ControlGroupBlock.propTypes = {
  /** The className of the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default ControlGroupBlock
