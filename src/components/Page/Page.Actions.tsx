import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import Page from './Page'
import {
  ActionsUI,
  ActionsBlockUI,
  ActionsItemUI,
  StickyActionsWrapperUI,
} from './styles/Page.Actions.css'
import StickyActions from './Page.StickyActions'
import { PageActionsProps, PageActionsState } from './Page.types'
import { COMPONENT_KEY } from './Page.utils'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'

export class Actions extends React.PureComponent<
  PageActionsProps,
  PageActionsState
> {
  static className = 'c-PageActions'

  static defaultProps = {
    direction: 'right',
    innerRef: noop,
    onStickyStart: noop,
    onStickyEnd: noop,
    isResponsive: false,
    isSticky: false,
    zIndex: 10,
  }

  state = {
    isStickyActive: this.props.isSticky,
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
    const isStickyActive = !isIntersecting

    this.setState({
      isStickyActive,
    })
  }

  handleOnStickyStart = node => {
    this.setState({
      isStickyActive: true,
    })
    this.props.onStickyStart(node)
  }

  handleOnStickyStop = node => {
    this.setState({
      isStickyActive: false,
    })
    this.props.onStickyEnd(node)
  }

  renderContent({ withStickyWrapper }) {
    const {
      innerRef,
      isResponsive,
      primary,
      serious,
      secondary,
      zIndex,
      ...rest
    } = this.props
    const { isStickyActive } = this.state

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

    if (isStickyActive) {
      return (
        <StickyActionsWrapperUI zIndex={zIndex}>
          <Page isResponsive={isResponsive}>{content}</Page>
        </StickyActionsWrapperUI>
      )
    } else {
      return null
    }
  }

  renderStickyActions() {
    const { isSticky } = this.props
    const { isStickyActive } = this.state

    if (!(isSticky && isStickyActive)) return null

    return this.renderContent({ withStickyWrapper: true })
  }

  render() {
    return (
      <div>
        <StickyActions
          onStickyStart={this.handleOnStickyStart}
          onStickyEnd={this.handleOnStickyStop}
        >
          {this.renderContent({ withStickyWrapper: false })}
        </StickyActions>
        {this.renderStickyActions()}
      </div>
    )
  }
}

export default propConnect(COMPONENT_KEY.Actions)(Actions)
