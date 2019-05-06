import { propConnect } from '../PropProvider'
import FormGroup from './FormGroup'
import Choice from './FromGroup.Choice'
import Grid from './FromGroup.Grid'

FormGroup.Choice = propConnect('FormGroupChoice')(Choice)
FormGroup.Grid = propConnect('FormGroupGrid')(Grid)

export default propConnect('FormGroup')(FormGroup)
