export type PortalProps = {
  className: PropTypes.string,
  exact: PropTypes.bool,
  id: PropTypes.string,
  renderTo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onBeforeOpen: PropTypes.func,
  onOpen: PropTypes.func,
  onBeforeClose: PropTypes.func,
  onClose: PropTypes.func,
  path: PropTypes.string,
  timeout: PropTypes.number,
}
