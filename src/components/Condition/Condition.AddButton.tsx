import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import Icon from '../Icon'
import { ButtonWrapperUI, ButtonUI } from './styles/Condition.css'
import { classNames } from '../../utilities/classNames'
import { isNodeWithinViewport } from '../../utilities/node'
import { noop } from '../../utilities/other'
import { smoothScrollTo, linear } from '../../utilities/smoothScroll'
import { ConditionAddButtonProps } from './Condition.types'
import { COMPONENT_KEY } from './Condition.utils'

class AddButton extends React.PureComponent<ConditionAddButtonProps> {
  static defaultProps = {
    isBorderless: false,
    onClick: noop,
    type: 'or',
  }

  static className = 'c-ConditionAddButton'

  node: HTMLDivElement

  getClassName() {
    const { className, isBorderless, type } = this.props

    const isAnd = type.toLowerCase() === 'and'
    const label = isAnd ? 'and' : 'or'

    return classNames(
      AddButton.className,
      isBorderless && 'is-borderless',
      `is-${label}`,
      className
    )
  }

  handleOnClick = event => {
    this.props.onClick(event)
    this.scrollIntoView()
  }

  scrollIntoView = () => {
    if (!this.node) return

    const offset = 200
    const isVisible = isNodeWithinViewport({ node: this.node, offset })
    const position = offset + window.scrollY

    if (isVisible) return

    smoothScrollTo({
      node: window,
      position,
      direction: 'y',
      duration: 300,
      timingFunction: linear,
    })
  }

  setNodeRef = node => (this.node = node)

  render() {
    const { className, isBorderless, type, ...rest } = this.props

    const isAnd = type.toLowerCase() === 'and'

    const align = isAnd ? 'center' : 'left'
    const iconSize = isAnd ? 24 : 20
    const label = isAnd ? 'and' : 'or'
    const size = isAnd ? 'sm' : 'xxs'

    return (
      <ButtonWrapperUI align={align} innerRef={this.setNodeRef}>
        <ButtonUI
          {...rest}
          className={this.getClassName()}
          kind="secondaryAlt"
          onClick={this.handleOnClick}
          size={size}
          version={2}
        >
          <Icon name="plus-small" isWithHiddenTitle={false} size={iconSize} />
          {label}
        </ButtonUI>
      </ButtonWrapperUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY.AddButton)(AddButton)

export default PropConnectedComponent
