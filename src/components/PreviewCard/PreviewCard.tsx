import * as React from 'react'
import Context from './PreviewCard.Context'
import Card from '../Card'
import Heading from '../Heading'
import Text from '../Text'
import styled from '../styled'
import { classNames } from '../../utilities/classNames'
import css from './styles/PreviewCard.css.js'

type Props = {
  children?: any
  className?: string
  isNote?: boolean
  title?: string
}

const PreviewCard = (props: Props) => {
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
      <Card className={componentClassName} {...rest}>
        {titleMarkup}
        <Text muted className="c-PreviewCard__content">
          {children}
        </Text>
      </Card>
    )
  }

  return (
    <Context.Consumer>
      {contextProps => createMarkup(contextProps)}
    </Context.Consumer>
  )
}

export default styled(PreviewCard)(css)
