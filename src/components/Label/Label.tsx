import * as React from 'react'
import { UIState } from '../../constants/types'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { isString } from '../../utilities/is'
import { LabelUI } from './Label.css'

type Props = {
  className?: string
  children?: any
  for: string
  isMarginless: boolean
  state?: UIState
}

class Label extends React.PureComponent<Props> {
  static defaultProps = {
    isMarginless: false,
    state: 'default',
  }

  render() {
    const {
      className,
      children,
      for: htmlFor,
      isMarginless,
      state,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-Label',
      isMarginless && 'is-marginless',
      state && `is-${state}`,
      className
    )

    const contentMarkup = isString(children) ? (
      <Text className="c-Label__text" shade="subtle">
        {children}
      </Text>
    ) : (
      children
    )

    return (
      <LabelUI {...rest} className={componentClassName} htmlFor={htmlFor}>
        {contentMarkup}
      </LabelUI>
    )
  }
}

export default Label
