import ThemeProvider from '../ThemeProvider/index'

const propTypes = {
  theme: () => null,
}

const defaultProps = {
  theme: 'default',
}

const childContextTypes = propTypes

const Provider = ThemeProvider

Provider.propTypes = propTypes
Provider.defaultProps = defaultProps
Provider.childContextTypes = childContextTypes
Provider.displayName = 'AttachmentProvider'

export default Provider
