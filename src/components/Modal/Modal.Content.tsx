import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ContentUI } from './styles/Modal.Content.css'
import { ModalContentProps } from './Modal.types'
import Body from './Modal.Body'

class Content extends React.PureComponent<ModalContentProps> {
  static displayName = 'Modal.Content'
  static defaultProps = {
    scrollableRef: noop,
  }

  render() {
    const { className, children, scrollableRef, ...rest } = this.props

    const componentClassName = classNames('c-ModalContent', className)

    const childrenMarkup = React.Children.map(children, child => {
      if (child && child.type === Body) {
        return React.cloneElement(child, {
          scrollableRef,
        })
      }

      return child
    })

    return (
      <ContentUI className={componentClassName} {...rest}>
        {childrenMarkup}
      </ContentUI>
    )
  }
}

export default Content
