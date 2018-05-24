import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import Inline from '../Inline'
import Overflow from '../Overflow'
import Tag from '../Tag'
import { noop } from '../../utilities/other'

export const propTypes = {
  onRemove: PropTypes.func,
  overflowFade: PropTypes.bool,
  isRemovable: PropTypes.bool,
}

const defaultProps = {
  onRemove: noop,
  overflowFade: false,
  isRemovable: false,
}

class TagList extends Component {
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

    const childrenMarkup = React.Children.map(children, tag => {
      if (tag.type !== Tag) return null

      return (
        <Inline.Item extendChild>
          {React.cloneElement(tag, {
            ...tag.props,
            isRemovable,
            onRemove: handleOnRemove,
          })}
        </Inline.Item>
      )
    })

    const componentMarkup = <Inline size="xs">{childrenMarkup}</Inline>

    return (
      <div className={componentClassName} {...rest}>
        {overflowFade ? (
          <Overflow>{componentMarkup}</Overflow>
        ) : (
          componentMarkup
        )}
      </div>
    )
  }
}

TagList.propTypes = propTypes
TagList.defaultProps = defaultProps
TagList.displayName = 'TagList'

export default TagList
