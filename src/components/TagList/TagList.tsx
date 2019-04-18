import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import Inline from '../Inline'
import Overflow from '../Overflow'
import PropProvider from '../PropProvider'
import { classNames } from '../../utilities/classNames'
import { isComponentNamed } from '../../utilities/component'
import { noop, promiseNoop } from '../../utilities/other'
import { TagListUI, ClearAllUI } from './TagList.css'
import { COMPONENT_KEY } from './TagList.utils'
import { COMPONENT_KEY as TAG } from '../Tag/Tag.utils'

export interface Props {
  className?: string
  children?: any
  onBeforeRemove: any
  onRemove: (value: any) => void
  overflowFade: boolean
  isRemovable: boolean
  clearAll: boolean
  showAll: boolean
}

export class TagList extends React.PureComponent<Props> {
  static defaultProps = {
    onBeforeRemove: promiseNoop,
    onRemove: noop,
    overflowFade: false,
    isRemovable: false,
    clearAll: false,
    showAll: false,
  }

  static className = 'c-TagList'

  getClassName() {
    const { className, showAll } = this.props

    return classNames(
      TagList.className,
      showAll ? 'is-showingAll' : '',
      className
    )
  }

  handleOnRemove = value => this.props.onRemove(value)

  renderContent() {
    const { onBeforeRemove, children, isRemovable, clearAll } = this.props

    const providerProps = {
      [TAG]: { onBeforeRemove, isRemovable, onRemove: this.handleOnRemove },
    }

    const childrenLength = React.Children.count(children)
    const childrenMarkup = React.Children.map(children, (child, index) => {
      if (!isComponentNamed(child, TAG)) return null

      const isLastChildWithClearAll = childrenLength - 1 === index && clearAll
      return (
        <Inline.Item>
          {React.cloneElement(child)}
          {isLastChildWithClearAll && (
            <ClearAllUI key="clearAllButton">Clear all</ClearAllUI>
          )}
        </Inline.Item>
      )
    })

    return (
      <PropProvider value={providerProps}>
        <Inline size="xs">{childrenMarkup}</Inline>
      </PropProvider>
    )
  }

  render() {
    const { overflowFade, ...rest } = this.props

    const componentMarkup = this.renderContent()

    return (
      <TagListUI {...getValidProps(rest)} className={this.getClassName()}>
        {overflowFade ? (
          <Overflow>{componentMarkup}</Overflow>
        ) : (
          componentMarkup
        )}
      </TagListUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(TagList)

export default PropConnectedComponent
