import { ActionsDirection } from './types'
import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import {
  ActionsUI,
  ActionsBlockUI,
  ActionsItemUI,
  StickyActionsWrapperUI,
} from './styles/Actions.css'
import Page from './Page'
import { COMPONENT_KEY } from './utils'

export interface Props {
  className?: string
  direction?: ActionsDirection
  innerRef: (node: HTMLElement) => void
  primary?: any
  secondary?: any
  serious?: any
}

export interface State {
  isSticky: boolean
}

class Actions extends React.PureComponent<Props, State> {
  node: HTMLElement
  observer: IntersectionObserver

  static className = 'c-PageActions'
  static defaultProps = {
    direction: 'right',
    innerRef: noop,
  }

  state = {
    isSticky: true,
  }

  componentDidMount() {
    const observerOptions = {
      root: null,
      rootMargin: '-10px',
      threshold: 1.0,
    }
    this.observer = new IntersectionObserver(
      this.handleOnIntersect,
      observerOptions
    )
    this.observer.observe(this.node)
  }

  componentWillUnmount() {
    this.observer.unobserve(this.node)
  }

  getClassName() {
    const { className, direction, primary, serious, secondary } = this.props

    return classNames(
      Actions.className,
      direction && `is-${direction}`,
      primary && 'withPrimary',
      secondary && 'withSecondary',
      serious && 'withSerious',
      className
    )
  }

  handleOnIntersect = changes => {
    const { isIntersecting } = changes[0]
    const isSticky = !isIntersecting

    this.setState({
      isSticky,
    })
  }

  setNodeRef = node => {
    this.node = node
  }

  renderContent({ withStickyWrapper }) {
    const { innerRef, primary, serious, secondary, ...rest } = this.props
    const { isSticky } = this.state

    const content = (
      <ActionsUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        innerRef={withStickyWrapper ? innerRef : null}
        withStickyWrapper={withStickyWrapper}
        role="toolbar"
      >
        <ActionsItemUI className="c-PageActions__primary">
          {primary}
        </ActionsItemUI>
        <ActionsItemUI className="c-PageActions__secondary">
          {secondary}
        </ActionsItemUI>
        <ActionsBlockUI className="c-PageActions__block" />
        <ActionsItemUI className="c-PageActions__serious">
          {serious}
        </ActionsItemUI>
      </ActionsUI>
    )

    if (!withStickyWrapper) return content

    if (isSticky) {
      return (
        <StickyActionsWrapperUI>
          <Page isResponsive>{content}</Page>
        </StickyActionsWrapperUI>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <div>
        <div ref={this.setNodeRef}>
          {this.renderContent({ withStickyWrapper: false })}
        </div>
        {this.renderContent({ withStickyWrapper: true })}
      </div>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Actions)(Actions)

export default Actions
