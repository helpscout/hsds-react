// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Heading from '../Heading'
import Hr from '../Hr'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { HeaderUI, TitleUI, SubTitleUI } from './styles/Header.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  children?: any,
  className?: string,
  title: string,
  subTitle?: string,
  withBorder: boolean,
}

class Header extends Component<Props> {
  static defaultProps = {
    title: 'Title',
    withBorder: true,
  }
  static displayName = 'Page.Header'

  render() {
    const {
      children,
      className,
      title,
      subTitle,
      withBorder,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-PageHeader',
      withBorder && 'withBorder',
      className
    )

    const titleMarkup = title && (
      <TitleUI className="c-PageHeader__title">
        <Heading className="c-PageHeader__titleHeading" size="md">
          {title}
        </Heading>
      </TitleUI>
    )
    const subTitleMarkup = subTitle && (
      <SubTitleUI className="c-PageHeader__subTitle">
        <Text className="c-PageHeader__subTitleText" shade="muted">
          {subTitle}
        </Text>
      </SubTitleUI>
    )
    const borderMarkup = withBorder && (
      <Hr className="c-PageHeader__border" size="sm" />
    )

    return (
      <HeaderUI className={componentClassName} {...getValidProps(rest)}>
        {titleMarkup}
        {subTitleMarkup}
        {borderMarkup}
      </HeaderUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Header)(Header)

export default Header
