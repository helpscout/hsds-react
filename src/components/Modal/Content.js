// @flow
import React, { PureComponent as Component } from 'react'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent, isComponentNamed } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { COMPONENT_KEY } from './utils'

type Props = {
  children?: any,
  className?: string,
  scrollableRef: (node: HTMLElement) => void,
}

class Content extends Component<Props> {
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
      <div className={componentClassName} {...rest}>
        {childrenMarkup}
      </div>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Content)(Content)

export default Content
