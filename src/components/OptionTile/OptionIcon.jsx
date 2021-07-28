import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Icon from '../Icon'
import classNames from 'classnames'
import { OptionIconUI } from './OptionIcon.css'

class OptionIcon extends React.PureComponent {
  render() {
    const { className, children, icon, title, ...rest } = this.props
    const componentClassName = classNames('c-OptionIcon', className)

    return (
      <OptionIconUI {...getValidProps(rest)} className={componentClassName}>
        <Icon
          className="c-OptionIcon__icon"
          name={icon}
          title={title}
          size={24}
        />
      </OptionIconUI>
    )
  }
}

OptionIcon.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
}

OptionIcon.defaultProps = {
  'data-cy': 'OptionIcon',
  icon: 'chat',
}

export default OptionIcon
