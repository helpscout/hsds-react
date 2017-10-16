import React from 'react'
import PropTypes from 'prop-types'
import Card from '../Card'
import Heading from '../Heading'
import Text from '../Text'
import classNames from '../../utilities/classNames'

export const propTypes = {
  title: PropTypes.string
}

const PreviewCard = props => {
  const {
    children,
    className,
    title,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-PreviewCard',
    className
  )

  const titleMarkup = title ? (
    <Heading className='c-PreviewCard__title' size='h5'>
      {title}
    </Heading>
  ) : null

  return (
    <Card className={componentClassName} {...rest}>
      {titleMarkup}
      <Text muted className='c-PreviewCard__content'>
        {children}
      </Text>
    </Card>
  )
}

PreviewCard.propTypes = propTypes

export default PreviewCard
