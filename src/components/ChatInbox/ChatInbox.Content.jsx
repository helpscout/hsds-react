import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

class Content extends React.Component {
  render() {
    const { className, children, ...rest } = this.props
    const componentClassName = classNames('c-ChatInboxContent', className)

    return (
      <div {...getValidProps(rest)} className={componentClassName}>
        {children}
      </div>
    )
  }
}

Content.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

Content.defaultProps = {
  'data-cy': 'ChatInboxContent',
}

export default Content
