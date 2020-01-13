import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import { SectionUI, SectionHeadingUI } from './styles/SideNavigation.css'
import FadeInOut from './SideNavigation.FadeInOut'

export const Section = ({
  children,
  className,
  title,
  withPadding,
  ...rest
}) => (
  <SectionUI
    {...getValidProps(rest)}
    className={classNames(
      'c-SideNavigation__Section',
      withPadding ? 'is-with-padding' : '',
      className
    )}
  >
    {title && (
      <FadeInOut>
        <SectionHeadingUI size="small">{title}</SectionHeadingUI>
      </FadeInOut>
    )}
    {children}
  </SectionUI>
)

Section.displayName = 'SideNavigation.Section'

Section.defaultProps = {
  withPadding: false,
}

export default Section
