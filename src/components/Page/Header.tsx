import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { HeaderUI, TitleUI, SubTitleUI, HeadingUI } from './styles/Header.css'
import { COMPONENT_KEY } from './utils'

export interface Props {
  children?: any
  className?: string
  isResponsive: boolean
  render?: any
  title?: string
  subtitle?: string
  withBorder: boolean
  withBottomMargin: boolean
}

const Title = props => {
  const { headingLevel, isSecondary, className, children, ...rest } = props
  const componentClassName = classNames('c-PageHeading', className)

  return (
    <TitleUI className="c-PageHeader__title">
      <HeadingUI
        {...getValidProps(rest)}
        selector={headingLevel || 'h1'}
        size={isSecondary ? 'h4' : 'md'}
        className={componentClassName}
      >
        {children}
      </HeadingUI>
    </TitleUI>
  )
}

const Subtitle = ({ children }) => (
  <SubTitleUI className="c-PageHeader__subtitle">
    <Text shade="muted">{children}</Text>
  </SubTitleUI>
)

class Header extends React.PureComponent<Props> {
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

namespaceComponent(COMPONENT_KEY.Header)(Header)

export default Header
