import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Text from './Skeleton.Text'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Skeleton.utils'

class Paragraph extends Component {
  render() {
    // TODO: fix typescript complains
    // @ts-ignore
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

namespaceComponent(COMPONENT_KEY.Paragraph)(Paragraph)

export default Paragraph
