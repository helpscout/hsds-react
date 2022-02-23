import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SortableDragHandle from './Sortable.DragHandle'
import SortableItem from './Sortable.Item'
import SortableList from './Sortable.List'
import arrayMove from '../../utilities/arrayMove.lib'

function noop() {}

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
      const sortableElement =
        child.type.displayName &&
        child.type.displayName.includes('sortableElement')
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

Sortable.DragHandle = SortableDragHandle
Sortable.Item = SortableItem
Sortable.List = SortableList

Sortable.defaultProps = {
  'data-cy': 'Sortable',
  onSortStart: noop,
  onSortMove: noop,
  onSortEnd: noop,
}

Sortable.propTypes = {
  /** Items can be sorted horizontally, vertically or in a grid. Possible values: `x`, `y` or `xy` */
  axis: PropTypes.oneOf(['x', 'y', 'xy']),
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** If you'd like elements to only become sortable after being dragged a certain number of pixels. Cannot be used in conjunction with the `pressDelay` prop. */
  distance: PropTypes.number,
  /** Optional function to return the scrollable container element. This property defaults to the `SortableContainer` element itself or (if `useWindowAsScrollContainer` is true) the window. Use this function to specify a custom container object (eg this is useful for integrating with certain 3rd party components such as `FlexTable`). This function is passed a single parameter (the `wrappedInstance` React element) and it is expected to return a DOM element. */
  getContainer: PropTypes.func,
  /** Optional `function({node, index, collection})` that should return the computed dimensions of the SortableHelper. See [default implementation](https://github.com/clauderic/react-sortable-hoc/blob/master/src/SortableContainer/index.js#L58) for more details */
  getHelperDimensions: PropTypes.func,
  /** You can provide a class you'd like to add to the sortable helper to add some styles to it */
  helperClass: PropTypes.string,
  /** Whether to auto-hide the ghost element. By default, as a convenience, React Sortable List will automatically hide the element that is currently being sorted. Set this to false if you would like to apply your own styling. */
  hideSortableGhost: PropTypes.bool,
  /** If you'd like, you can lock movement to an axis while sorting. This is not something that is possible with HTML5 Drag & Drop */
  lockAxis: PropTypes.string,
  /** You can lock movement of the sortable element to it's parent `SortableContainer` */
  lockToContainerEdges: PropTypes.bool,
  /** When `lockToContainerEdges` is set to `true`, this controls the offset distance between the sortable helper and the top/bottom edges of it's parent `SortableContainer`. Percentage values are relative to the height of the item currently being sorted. If you wish to specify different behaviours for locking to the _top_ of the container vs the _bottom_, you may also pass in an `array` (For example: `["0%", "100%"]`). */
  lockOffset: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.number),
    ]),
  ]),
  /** If you'd like elements to only become sortable after being pressed for a certain time, change this property. A good sensible default value for mobile is `200`. Cannot be used in conjunction with the distance prop. */
  pressDelay: PropTypes.number,
  /** Number of pixels of movement to tolerate before ignoring a press event. */
  pressThreshold: PropTypes.number,
  /** Callback that get's invoked when sorting begins. `function({node, index, collection}, event)` */
  onSortStart: PropTypes.func,
  /** Callback that get's invoked during sorting as the cursor moves. `function(event)` */
  onSortMove: PropTypes.func,
  /** Callback that get's invoked when sorting ends. `function({oldIndex, newIndex, collection}, e)` */
  onSortEnd: PropTypes.func,
  /** This function get's invoked before sorting begins, and can be used to programatically cancel sorting before it begins. By default, it will cancel sorting if the event target is either an `input`, `textarea`, `select` or `option`. */
  shouldCancelStart: PropTypes.func,
  /** If you're using the `SortableHandle` HOC, set this to `true` */
  useDragHandle: PropTypes.bool,
  /** If you want, you can set the `window` as the scrolling container */
  useWindowAsScrollContainer: PropTypes.bool,
  /** The duration of the transition when elements shift positions. Set this to `0` if you'd like to disable transitions */
  transitionDuration: PropTypes.number,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export { default as arrayMove } from '../../utilities/arrayMove.lib'

export default Sortable
