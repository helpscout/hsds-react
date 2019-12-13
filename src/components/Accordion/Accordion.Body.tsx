import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Collapsible from '../Collapsible'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { BodyUI } from './styles/Accordion.css'
import { BodyProps } from './Accordion.types'

export const classNameStrings = {
  baseComponentClassName: 'c-Accordion__Section__Body',
  isOpenClassName: 'is-open',
  isPageClassName: 'is-page',
  isSeamlessClassName: 'is-seamless',
  isSizeXsClassName: 'is-xs',
  isSizeSmClassName: 'is-sm',
  isSizeMdClassName: 'is-md',
  isSizeLgClassName: 'is-lg',
}

const getComponentClassName = ({
  className,
  isOpen,
  isPage,
  isSeamless,
  size,
}: BodyProps): string => {
  const {
    baseComponentClassName,
    isOpenClassName,
    isPageClassName,
    isSeamlessClassName,
    isSizeXsClassName,
    isSizeSmClassName,
    isSizeMdClassName,
    isSizeLgClassName,
  } = classNameStrings
  return classNames(
    baseComponentClassName,
    isOpen && isOpenClassName,
    isPage && isPageClassName,
    isSeamless && isSeamlessClassName,
    size && size === 'xs' && isSizeXsClassName,
    size && size === 'sm' && isSizeSmClassName,
    size && size === 'md' && isSizeMdClassName,
    size && size === 'lg' && isSizeLgClassName,
    className
  )
}

export class Body extends React.Component<BodyProps> {
  static defaultProps = {
    isOpen: false,
    isPage: false,
    isSeamless: false,
    onOpen: noop,
    onClose: noop,
  }

  static displayName = 'AccordionBody'

  // This method is difficult to test through this component in enzyme
  // but tests for the Collapsible component should cover this.
  handleOnOpen = () => {
    const { onOpen, uuid } = this.props

    onOpen(uuid)
  }

  // This method is difficult to test through this component in enzyme
  // but tests for the Collapsible component should cover this.
  handleOnClose = () => {
    const { onClose, uuid } = this.props

    onClose(uuid)
  }

  render() {
    const { duration, isOpen, uuid, ...rest } = this.props
    const id = `accordion__section__body--${uuid}`
    const componentClassName = getComponentClassName(this.props)

    return (
      <Collapsible
        duration={duration}
        id={id}
        isOpen={isOpen}
        onOpen={this.handleOnOpen}
        onClose={this.handleOnClose}
      >
        <BodyUI {...getValidProps(rest)} className={componentClassName} />
      </Collapsible>
    )
  }
}

export default Body
