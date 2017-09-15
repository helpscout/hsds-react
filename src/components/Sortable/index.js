import React, {PureComponent as Component} from 'react'
import {arrayMove} from 'react-sortable-hoc'
import classNames from '../../utilities/classNames'
import includes from 'lodash.includes'
import DragHandle from './DragHandle'
import Item from './Item'
import List from './List'
import { listTypes } from './propTypes'

export const propTypes = listTypes

class Sortable extends Component {
  constructor () {
    super()
    this.state = {
      items: []
    }
    this.onSortEnd = this.onSortEnd.bind(this)
  }

  componentWillMount () {
    this.remapChildrenToState()
  }

  remapChildrenToState () {
    const { children } = this.props
    if (!children) return

    const items = React.Children.map(children, (child, index) => {
      const sortableElement = includes(child.type.displayName, 'sortableElement')
      const key = `item-${index}`

      if (sortableElement) {
        return React.cloneElement(child, {
          index,
          key
        })
      }

      const childProps = child.props.sortable !== undefined ? { sortable: true } : {}
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
  onSortEnd ({oldIndex, newIndex, collection}, event) {
    /* istanbul ignore next */
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    })
    /* istanbul ignore next */
    if (this.props.onSortEnd) {
      this.props.onSortEnd({oldIndex, newIndex, collection}, event)
    }
  }

  render () {
    const {
      className,
      children,
      useDragHandle,
      helperClass,
      ...rest
    } = this.props
    const {
      items
    } = this.state

    const componentClassName = classNames(
      'c-Sortable',
      className
    )
    const helperClassName = classNames(
      'is-sorting',
      helperClass
    )

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
Sortable.DragHandle = DragHandle
Sortable.Item = Item
Sortable.List = List

export default Sortable
