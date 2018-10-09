// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Inline from '../Inline'
import Overflow from '../Overflow'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent, isComponentNamed } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { TagListUI } from './styles/TagList.css.js'
import { COMPONENT_KEY } from './utils'
import { COMPONENT_KEY as TAG } from '../Tag/utils'

type Props = {
  className?: string,
  children?: any,
  onRemove: (value: any) => void,
  overflowFade: boolean,
  isRemovable: boolean,
}

class TagList extends Component<Props> {
  static defaultProps = {
    onRemove: noop,
    overflowFade: false,
    isRemovable: false,
  }

  render() {
    const {
      className,
      children,
      onRemove,
      overflowFade,
      isRemovable,
      ...rest
    } = this.props

    const componentClassName = classNames('c-TagList', className)

    const handleOnRemove = value => {
      onRemove(value)
    }

    const childrenMarkup = React.Children.map(children, child => {
      if (!isComponentNamed(child, TAG)) return null

      return (
        <Inline.Item extendChild>
          {React.cloneElement(child, {
            ...child.props,
            isRemovable,
            onRemove: handleOnRemove,
          })}
        </Inline.Item>
      )
    })

    const componentMarkup = <Inline size="xs">{childrenMarkup}</Inline>

    return (
      <TagListUI className={componentClassName} {...getValidProps(rest)}>
        {overflowFade ? (
          <Overflow>{componentMarkup}</Overflow>
        ) : (
          componentMarkup
        )}
      </TagListUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(TagList)

export default TagList
