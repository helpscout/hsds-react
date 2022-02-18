// this Component leverage code from react-image for the loading part
// https://github.com/mbrevda/react-image
//
// Goal would be to either only use react-image at some point, or to migrate the loading
// code here into an <Image /> component

import React from 'react'
import { PropTypes } from 'prop-types'
import classNames from 'classnames'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import VisuallyHidden from '../VisuallyHidden'
import { ImageWrapperUI, ImageUI, InitialsUI } from './Avatar.css'
import { getAnimationProps } from './Avatar.utils'

function noop() {}

let cache = {}
export const clearCache = () => {
  cache = {}
}

export class AvatarImage extends React.PureComponent {
  sourceList = []

  image

  state = {
    currentIndex: 0,
    isLoading: false,
    isLoaded: false,
  }

  constructor(props) {
    super(props)

    this.sourceList = this.srcToArray(this.props.src)

    // check cache to decide at which index to start
    for (let i = 0; i < this.sourceList.length; i++) {
      // if we've never seen this image before, the cache wont help.
      // no need to look further, just start loading

      if (!(this.sourceList[i] in cache)) break

      // if we have loaded this image before, just load it again

      if (cache[this.sourceList[i]] === true) {
        this.state = { currentIndex: i, isLoading: false, isLoaded: true }
        this.props.onLoad()
        return
      }
    }

    this.state = this.sourceList.length
      ? // 'normal' opperation: start at 0 and try to load
        { currentIndex: 0, isLoading: true, isLoaded: false }
      : // if we dont have any sources, jump directly to unloaded
        { currentIndex: 0, isLoading: false, isLoaded: false }
  }

  srcToArray = src => (Array.isArray(src) ? src : [src]).filter(x => x)

  onLoad = () => {
    cache[this.sourceList[this.state.currentIndex]] = true

    if (this.image) {
      this.setState({ isLoaded: true })
      this.props.onLoad()
    }
  }

  onError = () => {
    cache[this.sourceList[this.state.currentIndex]] = false
    // if the current image has already been destroyed, we are probably no longer mounted
    // no need to do anything then

    if (!this.image) return false

    // before loading the next image, check to see if it was ever loaded in the past
    for (
      var nextIndex = this.state.currentIndex + 1;
      nextIndex < this.sourceList.length;
      nextIndex++
    ) {
      // get next img
      let src = this.sourceList[nextIndex]

      // if we have never seen it, its the one we want to try next
      if (!(src in cache)) {
        this.setState({ currentIndex: nextIndex })
        break
      }

      // if we know it exists, use it!

      if (cache[src] === true) {
        this.setState({
          currentIndex: nextIndex,
          isLoading: false,
          isLoaded: true,
        })
        this.props.onLoad()
        return true
      }

      // if we know it doesn't exist, skip it!

      if (cache[src] === false) continue
    }

    // currentIndex is zero bases, length is 1 based.
    // if we have no more sources to try, return - we are done
    if (nextIndex === this.sourceList.length) {
      this.setState({ isLoading: false })
      this.props.onError()
      return false
    }

    // otherwise, try the next img
    this.loadImg()
    return false
  }

  loadImg = () => {
    this.image = new Image()
    this.image.src = this.sourceList[this.state.currentIndex]

    if (this.image.decode) {
      this.image.decode().then(this.onLoad).catch(this.onError)
    } else {
      this.image.onload = this.onLoad
      this.image.onerror = this.onError
    }
  }

  unloadImg = () => {
    this.image.onerror = null
    this.image.onload = null

    // abort any current downloads https://github.com/mbrevda/react-image/pull/223
    this.image.src = ''

    try {
      delete this.image.src
    } catch (e) {
      // On Safari in Strict mode this will throw an exception,
      //  - https://github.com/mbrevda/react-image/issues/187
      // We don't need to do anything about it.
    }
    delete this.image
  }

  componentDidMount() {
    // kick off process

    if (this.state.isLoading) this.loadImg()
  }

  componentWillUnmount() {
    // ensure that we dont leave any lingering listeners

    if (this.image) this.unloadImg()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let src = this.srcToArray(nextProps.src)

    let srcAdded = src.filter(s => this.sourceList.indexOf(s) === -1)
    let srcRemoved = this.sourceList.filter(s => src.indexOf(s) === -1)

    // if src prop changed, restart the loading process
    if (srcAdded.length || srcRemoved.length) {
      this.sourceList = src

      // if we dont have any sources, jump directly to unloader
      if (!src.length)
        return this.setState({
          currentIndex: 0,
          isLoading: false,
          isLoaded: false,
        })
      this.setState(
        { currentIndex: 0, isLoading: true, isLoaded: false },
        this.loadImg
      )
    }
  }

  renderInitials() {
    const { light, initials } = this.props

    const componentClassName = classNames(
      'c-Avatar__initials',
      light && 'is-light'
    )

    return <InitialsUI className={componentClassName}>{initials}</InitialsUI>
  }

  render() {
    const { className, name, ...rest } = this.props

    const componentClassName = classNames(
      'c-Avatar__imageWrapper',
      this.state.isLoaded && 'is-loaded',
      className
    )

    const hasImage =
      this.state.isLoaded || (!this.state.isLoaded && this.state.isLoading)

    const animationProps = getAnimationProps(this.props)
    const contentMarkup = (
      <ImageWrapperUI
        className={componentClassName}
        {...getValidProps(rest)}
        {...animationProps}
      >
        <ImageUI
          className="c-Avatar__image"
          src={
            this.state.isLoaded
              ? this.sourceList[this.state.currentIndex]
              : null
          }
        >
          <div className="c-Avatar__name">
            <VisuallyHidden>{name}</VisuallyHidden>
          </div>
        </ImageUI>
      </ImageWrapperUI>
    )
    return hasImage ? contentMarkup : this.renderInitials()
  }
}

AvatarImage.defaultProps = {
  animation: true,
  animationDuration: 160,
  animationEasing: 'ease',
  'data-cy': 'AvatarImage',
  initials: null,
  light: false,
  name: null,
  onError: noop,
  onLoad: noop,
  src: null,
}

AvatarImage.propTypes = {
  animation: PropTypes.bool,
  animationDuration: PropTypes.number,
  animationEasing: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  initials: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  light: PropTypes.bool,
  name: PropTypes.string,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  src: PropTypes.any,
}

export default AvatarImage
