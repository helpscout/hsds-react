import React, { Component } from 'react'
import debounce from '../../utilities/debounce'

import { ContainerUI, OneLineEllipsisUI } from './styles/Ellipsified.css'

const CLASSNAMES = {
  container: 'Ellipsified__container',
  original: 'Ellipsified__original',
  changed: 'Ellipsified__changed',
}

export default class Ellipsified extends Component {
  static defaultProps = {
    isResponsive: true,
    lines: 1,
    lineHeight: 16,
    text: '',
  }

  constructor(props) {
    super(props)
    this.originalRef = React.createRef()
  }

  componentDidMount() {
    const { isResponsive } = this.props

    if (isResponsive) {
      const debouncedFn = debounce(e => {
        this.ellipsify()
      }, 600)

      window.addEventListener('resize', debouncedFn)
    }

    this.ellipsify()
  }

  ellipsify = () => {
    const { text, lineHeight, lines } = this.props
    if (lines === 1 || text === '') return

    const originalNode = this.originalRef.current
    const originalNodeHeight = originalNode.clientHeight
    const ellipsified = originalNode.parentElement.querySelector(
      `.${CLASSNAMES.changed}`
    )

    if (originalNodeHeight > lines * lineHeight) {
      const originalNodeWidth = originalNode.clientWidth
      const ellipsifiedNode = ellipsified || document.createElement('div')

      ellipsifiedNode.classList.add(CLASSNAMES.changed)
      ellipsifiedNode.textContent = text
      ellipsifiedNode.style.width = `${originalNodeWidth}px`
      originalNode.before(ellipsifiedNode)

      let currentHeight = ellipsifiedNode.clientHeight
      let words = ellipsifiedNode.textContent.split(' ')

      while (currentHeight > lines * lineHeight) {
        words.pop()
        ellipsifiedNode.textContent = words.join(' ')
        currentHeight = ellipsifiedNode.clientHeight
      }

      let ellipsifiedWord = words[words.length - 1]
      ellipsifiedWord = ellipsifiedWord.replace(
        ellipsifiedWord.slice(-3),
        '...'
      )
      words.pop()
      words.push(ellipsifiedWord)
      ellipsifiedNode.textContent = words.join(' ')
    } else {
      if (ellipsified) {
        ellipsified.remove()
      }
    }
  }

  render() {
    const { text, lineHeight, lines } = this.props

    return lines === 1 ? (
      <OneLineEllipsisUI>{text}</OneLineEllipsisUI>
    ) : (
      <ContainerUI
        className={CLASSNAMES.container}
        lineHeight={lineHeight}
        lines={lines}
      >
        <div className={CLASSNAMES.original} ref={this.originalRef}>
          {text}
        </div>
      </ContainerUI>
    )
  }
}
