// @flow
import { propConnect } from '../PropProvider'
import FormGroup from './FormGroup'
import Choice from './Choice'
import Grid from './Grid'

FormGroup.Choice = propConnect('FormGroupChoice')(Choice)
FormGroup.Grid = propConnect('FormGroupGrid')(Grid)

export default propConnect('FormGroup')(FormGroup)
