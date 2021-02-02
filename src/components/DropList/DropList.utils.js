import React from 'react'
import { Select } from './DropList.togglers'

export function isSelectTypeToggler(toggler) {
  return React.isValidElement(toggler) && toggler.type === Select
}

export function displayWarnings({ toggler, withMultipleSelection }) {
  if (!React.isValidElement(toggler)) {
    console.info(
      'Pass one of the provided togglers or a custom one to the `toggler` prop'
    )
  }
  if (isSelectTypeToggler(toggler) && withMultipleSelection) {
    console.info(
      'The Select toggler option should not have withMultipleSelection enabled, it has been disabled for you'
    )
  }
}
