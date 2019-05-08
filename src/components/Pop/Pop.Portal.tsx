import PortalWrapper from '../PortalWrapper'

export const PopPortal = ({ children }) => children

export default PortalWrapper({
  id: 'PopPortal',
  timeout: 80,
  alwaysCloseIfLast: true,
})(PopPortal)
