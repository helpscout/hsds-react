import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import Context from './PreviewCard.Context'
import Heading from '../Heading'
import Text from '../Text'
import classNames from 'classnames'
import { PreviewCardUI } from './PreviewCard.css'

const PreviewCard = props => {
  const { children, className, isNote, title, ...rest } = props
  const createMarkup = contextProps => {
    const { isNote } = contextProps
    const componentClassName = classNames(
      'c-PreviewCard',
      isNote && 'is-note',
      className
    )
    const titleMarkup = title ? (
      <Heading className="c-PreviewCard__title" size="h6">
        {title}
      </Heading>
    ) : null

    return (
      <PreviewCardUI {...getValidProps(rest)} className={componentClassName}>
        {titleMarkup}
        <Text muted className="c-PreviewCard__content">
          {children}
        </Text>
      </PreviewCardUI>
    )
  }

  return (
    <Context.Consumer>
      {contextProps => createMarkup(contextProps)}
    </Context.Consumer>
  )
}

PreviewCard.defaultProps = {
  'data-cy': 'PreviewCard',
}

PreviewCard.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  isNote: PropTypes.bool,
  /** Text on the Title (Heading) of the card */
  title: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default PreviewCard
