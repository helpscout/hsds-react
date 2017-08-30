import PropTypes from 'prop-types'

const propTypes = {
  exact: PropTypes.bool,
  renderTo: PropTypes.string,
  onBeforeOpen: PropTypes.func,
  onOpen: PropTypes.func,
  onBeforeClose: PropTypes.func,
  onClose: PropTypes.func,
  path: PropTypes.string,
  timeout: PropTypes.number
}

export default propTypes
