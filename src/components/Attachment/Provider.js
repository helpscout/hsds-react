import ThemeProvider from '../ThemeProvider'
import { providerContextTypes } from './propTypes'

const propTypes = providerContextTypes

const defaultProps = {
  theme: 'default',
}

const childContextTypes = providerContextTypes

const Provider = ThemeProvider

Provider.propTypes = propTypes
Provider.defaultProps = defaultProps
Provider.childContextTypes = childContextTypes
Provider.displayName = 'AttachmentProvider'

export default Provider
