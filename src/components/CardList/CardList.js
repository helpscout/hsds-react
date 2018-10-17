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
  animationEasing: string,
  animationSequence: string,
  animationStagger: number,
  children?: any,
  className?: string,
}

class CardList extends PureComponent<Props> {
  static defaultProps = {
    animationEasing: 'ease',
    animationSequence: 'fade up',
    animationStagger: 60,
  }

  getChildrenMarkup = () => {
    const { animationEasing, animationSequence, children } = this.props

    return React.Children.map(children, (child, index) => {
      if (!isComponentTypeCard(child)) {
        return null
      }

      return (
        <Animate
          key={index}
          ease={animationEasing}
          sequence={animationSequence}
        >
          {child}
        </Animate>
      )
    })
  }

  render() {
    const { animationStagger, className } = this.props
    const componentClassName = classNames('c-CardList', className)

    return (
      <AnimateGroup
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
