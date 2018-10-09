// @flow
import type { UIState } from '../../constants/types'
import React, { PureComponent as Component } from 'react'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { isString } from '../../utilities/is'
import { LabelUI } from './styles/Label.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  className?: string,
  children?: any,
  for: string,
  isMarginless: boolean,
  state?: UIState,
}

class Label extends Component<Props> {
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

namespaceComponent(COMPONENT_KEY)(Label)

export default Label
