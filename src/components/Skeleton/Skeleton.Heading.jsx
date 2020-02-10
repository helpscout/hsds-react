import React from 'react'
import PropTypes from 'prop-types'
import Text from './Skeleton.Text'
import { classNames } from '../../utilities/classNames'

class Heading extends React.PureComponent<any> {
  static displayName = 'Skeleton.Heading'

  static defaultProps = {
    style: {},
    width: '70%',
  }

  render() {
    const { className, ...rest } = this.props

    const componentClassName = classNames('c-SkeletonHeading', className)
    return <Text {...rest} className={componentClassName} heading />
  }
}

export default Heading
