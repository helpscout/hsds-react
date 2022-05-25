import React from 'react'
import { getValidProps } from '@hsds/utils-react'
import Animate from '../Animate'
import AnimateGroup from '../AnimateGroup'
import { getComponentKey } from '@hsds/utils-react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

export class CardList extends React.PureComponent {
  getChildrenMarkup = () => {
    const { children } = this.props

    return React.Children.map(children, (child, index) => {
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
        {...getValidProps(rest)}
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

CardList.defaultProps = {
  animationDelay: 0,
  animationEasing: 'ease',
  animationSequence: 'fade up',
  animationStagger: 60,
  'data-cy': 'CardList',
  stagger: true,
}

CardList.propTypes = {
  animationDelay: PropTypes.number,
  animationEasing: PropTypes.string,
  animationSequence: PropTypes.string,
  animationStagger: PropTypes.number,
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  stagger: PropTypes.bool,
}

export default CardList
