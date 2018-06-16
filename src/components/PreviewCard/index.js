// @flow
import React from 'react'
import Card from '../Card'
import Heading from '../Heading'
import Text from '../Text'
import classNames from '../../utilities/classNames'

type Props = {
  children?: any,
  className?: string,
  title?: string,
}

const PreviewCard = (props: Props) => {
  const { children, className, title, ...rest } = props

  const componentClassName = classNames('c-PreviewCard', className)

  const titleMarkup = title ? (
    <Heading className="c-PreviewCard__title" size="h5">
      {title}
    </Heading>
  ) : null

  return (
    <Card className={componentClassName} {...rest}>
      {titleMarkup}
      <Text muted className="c-PreviewCard__content">
        {children}
      </Text>
    </Card>
  )
}

export default PreviewCard
