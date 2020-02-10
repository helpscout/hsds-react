import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Text from './Skeleton.Text'
import { classNames } from '../../utilities/classNames'

class Paragraph extends React.PureComponent<any> {
  static displayName = 'Skeleton.Paragraph'

  render() {
    const { className, withAnimations, ...rest } = this.props

    const componentClassName = classNames('c-SkeletonParagraph', className)

    return (
      <div {...getValidProps(rest)} className={componentClassName}>
        <Text width="90%" withAnimations={withAnimations} />
        <Text width="60%" withAnimations={withAnimations} />
        <Text width="70%" withAnimations={withAnimations} />
        <Text width="20%" withAnimations={withAnimations} />
      </div>
    )
  }
}

export default Paragraph
