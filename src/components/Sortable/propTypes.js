import PropTypes from 'prop-types'

export const listTypes = {
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
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    )
  ]),
  getContainer: PropTypes.func,
  getHelperDimensions: PropTypes.func
}
