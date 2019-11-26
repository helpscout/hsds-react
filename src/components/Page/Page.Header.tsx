import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { HeaderUI, SubTitleUI, HeadingUI } from './styles/Page.Header.css'
import { COMPONENT_KEY } from './Page.utils'
import { PageHeaderProps } from './Page.types'

const Title = props => {
  const { headingLevel, isSecondary, className, children, ...rest } = props
  const componentClassName = classNames('c-PageHeading', className)

  return (
    <div className="c-PageHeader__title">
      <HeadingUI
        {...getValidProps(rest)}
        selector={headingLevel || 'h1'}
        size={isSecondary ? 'h4' : 'md'}
        className={componentClassName}
      >
        {children}
      </HeadingUI>
    </div>
  )
}

const Subtitle = ({ children }) => (
  <SubTitleUI className="c-PageHeader__subtitle">
    <Text shade="muted">{children}</Text>
  </SubTitleUI>
)

export class Header extends React.PureComponent<PageHeaderProps> {
  static defaultProps = {
    isResponsive: false,
    title: 'Title',
    withBorder: true,
    withBottomMargin: true,
  }

  render() {
    const {
      className,
      isResponsive,
      render,
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

    return (
      <HeaderUI {...getValidProps(rest)} className={componentClassName}>
        {render ? (
          render({ Title, Subtitle })
        ) : (
          <div>
            <Title>{title}</Title>
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
          </div>
        )}
      </HeaderUI>
    )
  }
}

export default propConnect(COMPONENT_KEY.Header)(Header)
