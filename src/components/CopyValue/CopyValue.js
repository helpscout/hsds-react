import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

import {
  CopyValueUI,
  ValueUI,
  IconButtonUI,
  PrefixUI,
  ConfirmationIconWrapperUI,
} from './CopyValue.css'
import { useCopyConfirmation } from '../CopyButton/CopyButton.utils'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import Icon from '../Icon'

const WrappedCopyValue = forwardRef(function CopyValue(props, ref) {
  const { className, prefix, value, renderValue, ...rest } = props
  const [shouldRenderConfirmation, handleClick] = useCopyConfirmation(props)

  const componentClassName = classNames('c-CopyValue', className)
  const iconButtonClassName = classNames(
    shouldRenderConfirmation && 'is-copyConfirmed'
  )

  return (
    <CopyValueUI className={componentClassName} data-testid="CopyValue">
      {renderValue ? (
        renderValue(value)
      ) : (
        <ValueUI weight={400} size={13}>
          {prefix && <PrefixUI>{prefix}</PrefixUI>}
          {value}
        </ValueUI>
      )}

      <IconButtonUI
        {...getValidProps(rest)}
        filled
        icon="copy-small"
        size="lg"
        theme="blue"
        onClick={e => {
          navigator.clipboard.writeText(value)
          e.target.blur()
          handleClick(e)
        }}
        className={iconButtonClassName}
        ref={ref}
      >
        <ConfirmationIconWrapperUI>
          <Icon
            className="c-CopyValue__iconConfirmation"
            name="checkmark"
            iconSize="24"
          />
        </ConfirmationIconWrapperUI>
      </IconButtonUI>
    </CopyValueUI>
  )
})

WrappedCopyValue.defaultProps = {
  resetTimeout: 1000,
}

WrappedCopyValue.propTypes = {
  onClick: PropTypes.func,
  onReset: PropTypes.func,
  prefix: PropTypes.string,
  renderValue: PropTypes.func,
  resetTimeout: PropTypes.number,
  value: PropTypes.string.isRequired,
}

export default WrappedCopyValue
