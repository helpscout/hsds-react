import React from 'react'
import Text from './Text'
import classNames from '../../utilities/classNames.ts'

const Paragraph = props => {
  const { className, ...rest } = props

  const componentClassName = classNames('c-SkeletonParagraph', className)

  return (
    <div className={componentClassName} {...rest}>
      <Text width="90%" />
      <Text width="60%" />
      <Text width="70%" />
      <Text width="20%" />
    </div>
  )
}

Paragraph.displayName = 'SkeletonParagraph'

export default Paragraph
