// @flow
// Public types
import type { Placement } from 'popper.js'
import type { ManagerProps } from './Manager'
import type { ReferenceProps, ReferenceChildrenProps } from './Reference'
import type {
  PopperChildrenProps,
  PopperArrowProps,
  PopperProps,
} from './Popper'

// Public components
import Popper, { placements } from './Popper'
import Manager from './Manager'
import Reference from './Reference'
export { Popper, placements, Manager, Reference }

export type {
  Placement,
  ManagerProps,
  ReferenceProps,
  ReferenceChildrenProps,
  PopperChildrenProps,
  PopperArrowProps,
  PopperProps,
}
