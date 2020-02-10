import React from 'react'
import PropTypes from 'prop-types'

import { TruncatedUI } from './EditableField.css'
import Truncate from '../Truncate'

import { TRUNCATED_CLASSNAMES } from './EditableField.utils'

const Truncated = ({ string, splitter }) => {
  if (splitter) {
    const [first, second] = string.split(splitter)

    return (
      <TruncatedUI
        className={`${TRUNCATED_CLASSNAMES.component} ${TRUNCATED_CLASSNAMES.withSplitter}`}
      >
        <span className={`${TRUNCATED_CLASSNAMES.firstChunk}`}>{first}</span>
        <span className={`${TRUNCATED_CLASSNAMES.secondChunk}`}>
          {splitter}
          {second}
        </span>
      </TruncatedUI>
    )
  }

  return (
    <Truncate className={`${TRUNCATED_CLASSNAMES.component}`}>
      {string}
    </Truncate>
  )
}

Truncated.propTypes = {
  className: PropTypes.string,
  string: PropTypes.string,
  splitter: PropTypes.string,
}

export default Truncated
