import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import Animate from '../Animate'
import AnimateGroup from '../AnimateGroup'
import { isComponentTypeCard, getComponentKey } from '../../utilities/component'
import { COMPONENT_KEY } from './CardList.utils'
import classNames from '../../utilities/classNames'

export interface Props {
  animationDelay: number
  animationEasing: string
  animationSequence: string
  animationStagger: number
  children?: any
  className?: string
  stagger: boolean
}

export class CardList extends React.PureComponent<Props> {
  static defaultProps = {
    animationDelay: 0,
    animationEasing: 'ease',
    animationSequence: 'fade up',
    animationStagger: 60,
    stagger: true,
  }

  getChildrenMarkup = () => {
    const { children } = this.props

    return React.Children.map(children, (child, index) => {
      if (!isComponentTypeCard(child)) {
        return null
      }
      const key = getComponentKey(child, index)

      return <Animate key={key}>{child}</Animate>
    })
  }

  render() {
    const {
      animationDelay,
      animationSequence,
      animationStagger,
      animationEasing,
      className,
      stagger,
      ...rest
    } = this.props
    const componentClassName = classNames('c-CardList', className)

    return (
      <AnimateGroup
        {...rest}
        delay={animationDelay}
        easing={animationEasing}
        className={componentClassName}
        sequence={animationSequence}
        stagger={stagger}
        staggerDelay={animationStagger}
      >
        {this.getChildrenMarkup()}
      </AnimateGroup>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(CardList)

export default PropConnectedComponent
