import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Inline from '../Inline'
import Overflow from '../Overflow'
import PropProvider from '../PropProvider'
import { classNames } from '../../utilities/classNames'
import { isComponentNamed } from '../../utilities/component'
import { noop, promiseNoop } from '../../utilities/other'
import { TagListUI, ClearAllUI } from './styles/TagList.css'
import { COMPONENT_KEY as TAG } from '../Tag/Tag.utils'

export interface Props {
  className?: string
  children?: any
  onBeforeRemove: any
  onRemove: (value: any) => void
  onRemoveAll: () => void
  overflowFade: boolean
  isRemovable: boolean
  clearAll: boolean
  showAll: boolean
  size?: 'lg' | 'md' | 'sm' | 'xs'
}

export class TagList extends React.PureComponent<Props> {
  static defaultProps = {
    onBeforeRemove: promiseNoop,
    onRemove: noop,
    onRemoveAll: noop,
    overflowFade: false,
    isRemovable: false,
    clearAll: false,
    showAll: false,
    size: 'xs',
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
  handleOnRemoveAll = () => this.props.onRemoveAll()

  renderContent() {
    const { onBeforeRemove, children, isRemovable, clearAll, size } = this.props

    const providerProps = {
      [TAG]: { onBeforeRemove, isRemovable, onRemove: this.handleOnRemove },
    }

    const childrenLength = React.Children.count(children)
    const childrenMarkup = React.Children.map(children, (child, index) => {
      if (!isComponentNamed(child, TAG)) return null

      const isLastChildWithClearAll =
        childrenLength - 1 === index && clearAll && childrenLength > 1
      return (
        <Inline.Item>
          {React.cloneElement(child)}
          {isLastChildWithClearAll && (
            <ClearAllUI key="clearAllButton" onClick={this.handleOnRemoveAll}>
              Clear all
            </ClearAllUI>
          )}
        </Inline.Item>
      )
    })

    return (
      <PropProvider value={providerProps}>
        <Inline size={size}>{childrenMarkup}</Inline>
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

export default TagList
