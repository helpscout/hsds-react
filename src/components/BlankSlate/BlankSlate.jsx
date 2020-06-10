import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Illo from '../Illo'
import { classNames } from '../../utilities/classNames'
import { BlankSlateUI, HeadingUI, TextUI, IlloUI } from './BlankSlate.css'

const getIllo = ({ illo, illoName, illoSize }) => {
  let content = null

  if (illo) {
    content = illo
  } else if (illoName) {
    content = <Illo name={illoName} size={illoSize} />
  }

  return content ? <IlloUI>{content}</IlloUI> : content
}

class BlankSlate extends React.PureComponent {
  render() {
    const {
      className,
      children,
      illo,
      illoName,
      illoSize,
      title,
      message,
      lightBackground,
      alignTop,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-BlankSlate',
      lightBackground ? 'with-light-background' : '',
      alignTop ? 'align-top' : '',
      className
    )

    return (
      <BlankSlateUI {...getValidProps(rest)} className={componentClassName}>
        {getIllo({ illo, illoName, illoSize })}
        {title && <HeadingUI size="h3">{title}</HeadingUI>}
        {message && <TextUI>{message}</TextUI>}
      </BlankSlateUI>
    )
  }
}

BlankSlate.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  message: PropTypes.any,
  title: PropTypes.string,
  illo: PropTypes.any,
  illoName: PropTypes.string,
  illoSize: PropTypes.number,
  lightBackground: PropTypes.bool,
  alignTop: PropTypes.bool,
}

BlankSlate.defaultProps = {
  'data-cy': 'BlankSlate',
  lightBackground: false,
  alignTop: false,
  illoSize: 80,
}

export default BlankSlate
