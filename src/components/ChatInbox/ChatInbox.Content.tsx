import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './ChatInbox.utils'

type Props = {
  children?: any
  className?: string
}

class Content extends React.Component<Props> {
  render() {
    const { className, children, ...rest } = this.props

    const componentClassName = classNames('c-ChatInboxContent', className)

    return (
      <div {...getValidProps(rest)} className={componentClassName}>
        {children}
      </div>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Content)(Content)

export default Content
