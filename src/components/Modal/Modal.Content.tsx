import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { isComponentNamed } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { COMPONENT_KEY } from './Modal.utils'
import { ContentUI } from './styles/Modal.Content.css'
import { ModalContentProps } from './Modal.types'

class Content extends React.PureComponent<ModalContentProps> {
  static displayName = 'Modal.Content'
  static defaultProps = {
    scrollableRef: noop,
  }

  render() {
    const { className, children, scrollableRef, ...rest } = this.props

    const componentClassName = classNames('c-ModalContent', className)

    const childrenMarkup = React.Children.map(children, child => {
      if (child && isComponentNamed(child, COMPONENT_KEY.Body)) {
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
