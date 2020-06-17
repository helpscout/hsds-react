import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { MODAL_KIND } from './Modal.utils'
import {
  AlertHeaderUI,
  AlertHeaderTitleUI,
  AlertHeaderDescriptionUI,
  BrandedHeaderUI,
  BrandedHeaderImageUI,
  BrandedHeaderTitleUI,
  DotStepperUI,
  HeaderDescriptionUI,
  HeaderUI,
  HeaderTitleUI,
} from './Modal.HeaderV2.css'
import DotStepper from '../DotStepper'
import Icon from '../Icon'

class ModalHeaderV2 extends React.PureComponent {
  renderAlertStyle() {
    const { className, children, description, title, ...rest } = this.props
    const componentClassName = classNames('c-ModalHeaderV2', className)

    return (
      <AlertHeaderUI
        {...getValidProps(rest)}
        className={componentClassName}
        placement={'top'}
      >
        {<AlertHeaderTitleUI>{title}</AlertHeaderTitleUI>}
        {description ? (
          <AlertHeaderDescriptionUI>{description}</AlertHeaderDescriptionUI>
        ) : null}
        {children}
      </AlertHeaderUI>
    )
  }

  renderBrandedStyle() {
    const {
      className,
      children,
      description,
      illo,
      illoSize,
      title,
      ...rest
    } = this.props

    const componentClassName = classNames('c-ModalHeaderV2', className)

    return (
      <BrandedHeaderUI
        {...getValidProps(rest)}
        className={componentClassName}
        placement={'top'}
      >
        {illo ? (
          <BrandedHeaderImageUI size={illoSize}>{illo}</BrandedHeaderImageUI>
        ) : null}
        {<BrandedHeaderTitleUI>{title}</BrandedHeaderTitleUI>}
        {description ? (
          <HeaderDescriptionUI>{description}</HeaderDescriptionUI>
        ) : null}
        {children}
      </BrandedHeaderUI>
    )
  }

  renderSequenceStyle() {
    const {
      className,
      children,
      description,
      illo,
      numSteps,
      step,
      title,
      ...rest
    } = this.props

    const componentClassName = classNames('c-ModalHeaderV2', className)

    return (
      <BrandedHeaderUI
        {...getValidProps(rest)}
        className={componentClassName}
        placement={'top'}
      >
        <DotStepperUI>
          <DotStepper numSteps={numSteps} step={step} />
        </DotStepperUI>
        {<BrandedHeaderTitleUI>{title}</BrandedHeaderTitleUI>}
        {description ? (
          <HeaderDescriptionUI>{description}</HeaderDescriptionUI>
        ) : null}
        {children}
      </BrandedHeaderUI>
    )
  }

  render() {
    const {
      className,
      children,
      description,
      icon,
      iconSize,
      kind,
      title,
      ...rest
    } = this.props

    const componentClassName = classNames('c-ModalHeaderV2', className)

    if (kind === MODAL_KIND.BRANDED) {
      return this.renderBrandedStyle()
    } else if (kind === MODAL_KIND.ALERT) {
      return this.renderAlertStyle()
    } else if (kind === MODAL_KIND.SEQUENCE) {
      return this.renderSequenceStyle()
    }

    return (
      <HeaderUI
        {...getValidProps(rest)}
        className={componentClassName}
        placement={'top'}
      >
        {icon ? <Icon name={icon} key={icon} size={iconSize} /> : null}
        {<HeaderTitleUI>{title}</HeaderTitleUI>}
        {children}
      </HeaderUI>
    )
  }
}

ModalHeaderV2.defaultProps = {
  'data-cy': 'ModalHeaderV2',
  description: null,
  icon: null,
  iconSize: '24',
  illo: null,
  illoSize: 60,
  kind: MODAL_KIND.DEFAULT,
  numSteps: 1,
  step: 1,
  title: 'Title',
}

export default ModalHeaderV2
