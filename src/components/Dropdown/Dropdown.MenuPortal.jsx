// Deprecated
/* istanbul ignore file */
import PortalWrapper from '../PortalWrapper'

export const MenuPortal = ({ children }) => children

export default PortalWrapper({
  id: 'DropdownMenuPortal',
  timeout: 80,
  alwaysCloseIfLast: true,
})(MenuPortal)
