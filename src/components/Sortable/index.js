import React, { PureComponent as Component } from 'react'
import { arrayMove } from 'react-sortable-hoc'
import classNames from '../../utilities/classNames'
import includes from 'lodash.includes'
import DragHandle from './DragHandle'
import Item from './Item'
import List from './List'
import { listTypes } from './propTypes'
import { noop } from '../../utilities/other'

export const propTypes = listTypes

const defaultProps = {
  onSortStart: noop,
  onSortMove: noop,
  onSortEnd: noop,
}

class Sortable extends Component {
  constructor() {
    super()
    this.state = {
      items: [],
    }
    this.onSortEnd = this.onSortEnd.bind(this)
  }

  componentWillMount() {
    this.remapChildrenToState()
  }

  componentWillReceiveProps(nextProps) {
    /* istanbul ignore next */
    /* Note: There are tests for this, but for some reason, Istanbul isn't
     * picking it up */
    if (this.props.children !== nextProps.children) {
      this.remapChildrenToState(nextProps.children)
    }
  }

  remapChildrenToState(children = this.props.children) {
    if (!children) return

    const items = React.Children.map(children, (child, index) => {
      const sortableElement = includes(
        child.type.displayName,
        'sortableElement'
      )
      const key = child.props.id ? child.props.id : `item-${index}`

      if (sortableElement) {
        return React.cloneElement(child, {
          index,
          key,
        })
      }

      const childProps =
        child.props.sortable !== undefined ? { sortable: true } : {}
      return (
        <Item key={key} index={index}>
          {React.cloneElement(child, childProps)}
        </Item>
      )
    })
    this.setState({ items })
  }

  // Based on the implementation of react-sortable-hoc
  // https://github.com/clauderic/react-sortable-hoc/#basic-example
  /* istanbul ignore next */
  onSortEnd({ oldIndex, newIndex, collection }, event) {
    /* istanbul ignore next */
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    })
    /* istanbul ignore next */
    if (this.props.onSortEnd) {
      this.props.onSortEnd({ oldIndex, newIndex, collection }, event)
    }
  }

  render() {
    const {
      className,
      children,
      useDragHandle,
      helperClass,
      onSortEnd,
      ...rest
    } = this.props
    const { items } = this.state

    const componentClassName = classNames('c-Sortable', className)
    const helperClassName = classNames('is-sorting', helperClass)

    return (
      <div className={componentClassName}>
        <List
          dragHandle={useDragHandle}
          helperClass={helperClassName}
          items={items}
          onSortEnd={this.onSortEnd}
          useDragHandle={useDragHandle}
          {...rest}
        />
      </div>
    )
  }
}

Sortable.propTypes = propTypes
Sortable.defaultProps = defaultProps
Sortable.DragHandle = DragHandle
Sortable.Item = Item
Sortable.List = List

export default Sortable
