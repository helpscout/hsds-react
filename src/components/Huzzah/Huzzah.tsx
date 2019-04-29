import * as React from 'react'
import styled from '../styled/index'
import HUZZAHS from './huzzahs'
import { classNames } from '../../utilities/classNames'
import { sample } from '../../utilities/collection'
import css from './styles/Huzzah.css'

export const DEFAULT_HUZZAH = 'donut'

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

/**
 * Retrieves the Huzzah (SVG HTML) string, falling back to a default Huzzah.
 *
 * @param   {string} name
 * @returns {string}
 */
export function getHuzzah(name: string): string {
  const fallbackHuzzah = HUZZAHS[DEFAULT_HUZZAH]
  if (!name) return fallbackHuzzah

  return HUZZAHS[name.toLowerCase()] || fallbackHuzzah
}

export default styled(Huzzah)(css)
