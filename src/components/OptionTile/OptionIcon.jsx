import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'
import { OptionIconUI } from './OptionIcon.css'

type Props = {
  children?: any
  className?: string
  icon: string
  title?: string
}

class OptionIcon extends React.PureComponent<Props> {
  static defaultProps = {
    icon: 'chat',
  }

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

export default OptionIcon
