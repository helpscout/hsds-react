import PropTypes from 'prop-types'

export const sequenceAnimationType = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.func
])

export const sequenceShapeType = PropTypes.shape({
  onEnter: sequenceAnimationType,
  onEntering: sequenceAnimationType,
  onEntered: sequenceAnimationType,
  onExit: sequenceAnimationType,
  onExiting: sequenceAnimationType,
  onExited: sequenceAnimationType
})

export const sequenceType = PropTypes.oneOfType([
  PropTypes.string,
  sequenceShapeType
])

export const sequencesType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(sequenceType)
])
