import * as React from 'react'
import styled from '../styled'
import HUZZAHS from './huzzahs'
import { getHuzzah, DEFAULT_HUZZAH } from './Huzzah.utils'
import { classNames } from '../../utilities/classNames'
import { sample } from '../../utilities/collection'
import css from './styles/Huzzah.css'

type HuzzahSize = 'lg' | 'md' | 'sm'

type Props = {
  children?: any
  className?: string
  isRandom: boolean
  name: string
  size: HuzzahSize
  styles: Object
}

class Huzzah extends React.PureComponent<Props> {
  static defaultProps = {
    isRandom: false,
    name: DEFAULT_HUZZAH,
    size: 'md',
  }

  render() {
    const { children, className, isRandom, name, size, ...rest } = this.props

    const componentClassName = classNames(
      'c-Huzzah',
      size && `is-${size}`,
      className
    )

    const huzzahSVG = isRandom ? sample(HUZZAHS) : getHuzzah(name)

    return (
      <div
        className={componentClassName}
        dangerouslySetInnerHTML={{ __html: huzzahSVG }}
        title={name}
        {...rest}
      />
    )
  }
}

export default styled(Huzzah)(css)
