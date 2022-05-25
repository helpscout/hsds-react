import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import Illo from '../Illo'
import classNames from 'classnames'
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

BlankSlate.defaultProps = {
  'data-cy': 'BlankSlate',
  lightBackground: false,
  alignTop: false,
  illoSize: 80,
}

BlankSlate.propTypes = {
  /** Will aligned to the top the content of the component */
  alignTop: PropTypes.bool,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** An instance of an Illo Component */
  illo: PropTypes.any,
  /** DEPRECATED. Name of the illustration, from the Illo component. */
  illoName: PropTypes.string,
  /** DEPRECATED. Size of the illustration, from the Illo component. */
  illoSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Will add a light background to the component */
  lightBackground: PropTypes.bool,
  /** Message displayed in the content area. Can be HTML */
  message: PropTypes.any,
  /** Title displayed in the content area */
  title: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default BlankSlate
