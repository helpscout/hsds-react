import React from 'react'
import Animate from '../Animate'
import AnimateGroup from '../AnimateGroup'
import { getComponentKey } from '../../utilities/component'
import classNames from '../../utilities/classNames'
import PropTypes from 'prop-types'

export class CardList extends React.PureComponent {
  static defaultProps = {
    animationDelay: 0,
    animationEasing: 'ease',
    animationSequence: 'fade up',
    animationStagger: 60,
    stagger: true,
  }

  getChildrenMarkup = () => {
    const { children, animationEasing } = this.props

    return React.Children.map(children, (child, index) => {
      const key = getComponentKey(child, index)

      return (
        <Animate easing={animationEasing} key={key}>
          {child}
        </Animate>
      )
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

CardList.propTypes = {
  /** Delay of animation applied to the child Cards. */
  animationDelay: PropTypes.number,
  /** Easing of animation applied to the child Cards. */
  animationEasing: PropTypes.string,
  /** Style of animation applied to the child Cards. */
  animationSequence: PropTypes.string,
  /** Amount (in `ms`) to stagger the animations of the Cards. */
  animationStagger: PropTypes.number,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Enables animation staggering for the child Cards. */
  stagger: PropTypes.bool,
}

export default CardList
