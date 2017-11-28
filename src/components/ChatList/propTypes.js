import PropTypes from 'prop-types'
import { propTypes as tagType } from '../Tag'

export const tagShape = PropTypes.shape(tagType)
export const tagTypes = PropTypes.arrayOf(tagShape)
