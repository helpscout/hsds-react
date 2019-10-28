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
    ref: noop,
    onStickyStart: noop,
    onStickyEnd: noop,
    isResponsive: false,
    isSticky: false,
    stickyOffset: 10,
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
      ref,
      isResponsive,
      primary,
      serious,
      secondary,
      zIndex,
      ...rest
    } = this.props

    const content = (
      <ActionsUI
        data-cy="PageActionsContent"
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={(withStickyWrapper ? ref : null) as any}
        withStickyWrapper={withStickyWrapper}
        role="toolbar"
      >
        <ActionsItemUI
          className="c-PageActions__primary"
          data-cy="PageActionsPrimaryItemWrapper"
        >
          {primary}
        </ActionsItemUI>
        <ActionsItemUI
          className="c-PageActions__secondary"
          data-cy="PageActionsSecondaryItemWrapper"
        >
          {secondary}
        </ActionsItemUI>
        <ActionsBlockUI className="c-PageActions__block" />
        <ActionsItemUI
          className="c-PageActions__serious"
          data-cy="PageActionsSeriousItemWrapper"
        >
          {serious}
        </ActionsItemUI>
      </ActionsUI>
    )

    if (!withStickyWrapper) return content

    return (
      <StickyActionsWrapperUI
        className="c-PageActions__stickyWrapper"
        data-cy="PageActionsStickyWrapper"
        zIndex={zIndex}
      >
        <Page isResponsive={isResponsive}>{content}</Page>
      </StickyActionsWrapperUI>
    )
  }

  renderStickyActions() {
    const { isSticky } = this.props
    const { isStickyActive } = this.state

    if (!(isSticky && isStickyActive)) return null

    return this.renderContent({ withStickyWrapper: true })
  }

  render() {
    const { stickyOffset } = this.props

    return (
      <div data-cy="PageActionsWrapper">
        <StickyActions
          onStickyStart={this.handleOnStickyStart}
          onStickyEnd={this.handleOnStickyStop}
          offset={stickyOffset}
        >
          {this.renderContent({ withStickyWrapper: false })}
        </StickyActions>
        {this.renderStickyActions()}
      </div>
    )
  }
}

export default propConnect(COMPONENT_KEY.Actions)(Actions)
