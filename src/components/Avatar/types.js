import PropTypes from 'prop-types'

const propTypes = {
  borderColor: PropTypes.string,
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  name: PropTypes.string.isRequired,
  size: PropTypes.string
}

export default propTypes
