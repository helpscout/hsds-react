import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

type Props = {
  children?: any
  className?: string
}

class Content extends React.Component<Props> {
  static displayName = 'ChatInboxContent'

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

export default Content
