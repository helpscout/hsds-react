// polyfill PhantomJS environment
import 'babel-polyfill'
import { mount } from 'enzyme'
import jQuery from 'jquery'
import '../../src/styles/blue.scss'
import '../../src/styles/blue.hs-app.scss'

// require all the test files in the test folder that end with Spec.js or Spec.jsx
const testsContext = require.context(".", true, /spec.jsx?$/);
testsContext.keys().forEach(testsContext);

const mountNode = document.createElement('div')
mountNode.id = 'karma-react-root'
document.body.appendChild(mountNode)

const mountHelper = (component) => {
  const wrapper = mount(component, { attachTo: mountNode })
  return wrapper
}

const $mountHelper = (component) => {
  mountNode.innerHTML = ''
  const wrapper = mountHelper(component)
  const $wrapper = $(wrapper.getDOMNode())
  return $wrapper
}

global.mount = mountHelper
global.$mount = $mountHelper
global.$ = jQuery
