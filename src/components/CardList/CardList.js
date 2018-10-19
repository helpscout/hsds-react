// @flow
import React, { PureComponent } from 'react'
import Animate from '../Animate'
import AnimateGroup from '../AnimateGroup'
import {
  isComponentTypeCard,
  namespaceComponent,
} from '../../utilities/component'
import { COMPONENT_KEY } from './utils'
import classNames from '../../utilities/classNames'

type Props = {
  animationDelay: number,
  animationEasing: string,
  animationSequence: string,
  animationStagger: number,
  children?: any,
  className?: string,
  stagger: boolean,
}

class CardList extends PureComponent<Props> {
  static defaultProps = {
    animationDelay: 0,
    animationEasing: 'ease',
    animationSequence: 'fade up',
    animationStagger: 60,
    stagger: true,
  }

  getChildrenMarkup = () => {
    const { animationDelay, animationEasing, animationSequence, children } = this.props

    return React.Children.map(children, (child, index) => {
      if (!isComponentTypeCard(child)) {
        return null
      }
      const id = child.props.id || child.key || `cardListChild-${index}`

      return (
        <Animate
          key={id}
          delay={animationDelay}
          easing={animationEasing}
          sequence={animationSequence}
        >
          {child}
        </Animate>
      )
    })
  }

  render() {
    const { animationStagger, className, ...rest } = this.props
    const componentClassName = classNames('c-CardList', className)

    return (
      <AnimateGroup
        {...rest}
        className={componentClassName}
        stagger
        staggerDelay={animationStagger}
      >
        {this.getChildrenMarkup()}
      </AnimateGroup>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(CardList)

export default CardList
