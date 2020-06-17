import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import SortableDragHandle from './Sortable.DragHandle'
import SortableItem from './Sortable.Item'
import SortableList from './Sortable.List'
import { includes } from '../../utilities/arrays'
import arrayMove from '../../utilities/arrayMove.lib'
import { noop } from '../../utilities/other'

class Sortable extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
    }
    this.onSortEnd = this.onSortEnd.bind(this)
  }

  UNSAFE_componentWillMount() {
    this.remapChildrenToState()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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
        <SortableItem key={key} index={index}>
          {React.cloneElement(child, childProps)}
        </SortableItem>
      )
    })

    this.setState({ items })
  }

  // Based on the implementation of react-sortable-hoc
  // https://github.com/clauderic/react-sortable-hoc/#basic-example

  onSortEnd({ oldIndex, newIndex, collection }, event) {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    })

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
        <SortableList
          data-cy="SortableList"
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

Sortable.propTypes = {
  axis: PropTypes.oneOf(['x', 'y', 'xy']),
  className: PropTypes.string,
  distance: PropTypes.number,
  lockAxis: PropTypes.string,
  helperClass: PropTypes.string,
  hideDragHandles: PropTypes.bool,
  transitionDuration: PropTypes.number,
  contentWindow: PropTypes.any,
  onSortStart: PropTypes.func,
  onSortMove: PropTypes.func,
  onSortEnd: PropTypes.func,
  shouldCancelStart: PropTypes.func,
  pressDelay: PropTypes.number,
  useDragHandle: PropTypes.bool,
  useWindowAsScrollContainer: PropTypes.bool,
  hideSortableGhost: PropTypes.bool,
  lockToContainerEdges: PropTypes.bool,
  lockOffset: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.number),
    ]),
  ]),
  getContainer: PropTypes.func,
  getHelperDimensions: PropTypes.func,
}

Sortable.defaultProps = {
  'data-cy': 'Sortable',
  onSortStart: noop,
  onSortMove: noop,
  onSortEnd: noop,
}

Sortable.DragHandle = SortableDragHandle
Sortable.Item = SortableItem
Sortable.List = SortableList

export { default as arrayMove } from '../../utilities/arrayMove.lib'

export default Sortable
