import SimpleThemeProvider from '../SimpleThemeProvider/index'

const propTypes = {
  theme: () => null,
}

const defaultProps = {
  theme: 'default',
}

const childContextTypes = propTypes

const Provider = SimpleThemeProvider

Provider.propTypes = propTypes
Provider.defaultProps = defaultProps
Provider.childContextTypes = childContextTypes
Provider.displayName = 'AttachmentProvider'

export default Provider
