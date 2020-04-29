import React from 'react'
import PropTypes from 'prop-types'
import Context from './PreviewCard.Context'

import Heading from '../Heading'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
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
      <PreviewCardUI className={componentClassName} {...rest}>
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

PreviewCard.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  isNote: PropTypes.bool,
  title: PropTypes.string,
}

export default PreviewCard