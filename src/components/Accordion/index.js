// @flow
import { propConnect } from '../PropProvider'
import Accordion from './Accordion'

Accordion.Body = propConnect('AccordionBody')(Accordion.Body)
Accordion.Section = propConnect('AccordionSection')(Accordion.Section)
Accordion.Title = propConnect('AccordionTitle')(Accordion.Title)

export default propConnect('Accordion')(Accordion)
