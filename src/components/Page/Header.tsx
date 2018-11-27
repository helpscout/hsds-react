import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { HeaderUI, TitleUI, SubTitleUI } from './styles/Header.css'
import Heading from './Heading'
import { COMPONENT_KEY } from './utils'

export interface Props {
  children?: any
  className?: string
  isResponsive: boolean
  title: string
  subtitle?: string
  withBorder: boolean
  withBottomMargin: boolean
}

class Header extends React.PureComponent<Props> {
  static defaultProps = {
    isResponsive: false,
    title: 'Title',
    withBorder: true,
    withBottomMargin: true,
  }

  render() {
    const {
      children,
      className,
      isResponsive,
      title,
      subtitle,
      withBorder,
      withBottomMargin,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-PageHeader',
      isResponsive && 'is-responsive',
      withBorder && 'is-withBorder',
      withBottomMargin && 'is-withBottomMargin',
      className
    )

    const titleMarkup = title && (
      <TitleUI className="c-PageHeader__title">
        <Heading className="c-PageHeader__titleHeading">
          {title}
        </Heading>
      </TitleUI>
    )
    const subtitleMarkup = subtitle && (
      <SubTitleUI className="c-PageHeader__subtitle">
        <Text className="c-PageHeader__subtitleText" shade="muted">
          {subtitle}
        </Text>
      </SubTitleUI>
    )

    return (
      <HeaderUI {...getValidProps(rest)} className={componentClassName}>
        {titleMarkup}
        {subtitleMarkup}
      </HeaderUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Header)(Header)

export default Header
