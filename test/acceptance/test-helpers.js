// polyfill PhantomJS environment
import 'babel-polyfill'
import { mount } from 'enzyme'
import jQuery from 'jquery'
import '../../src/styles/blue.scss'
import '../../src/styles/blue.hs-app.scss'
export { default as wait, waitForSelectors } from '../../src/tests/helpers/wait'

// require all the test files in the test folder that end with Spec.js or Spec.jsx
const testsContext = require.context('.', true, /spec.jsx?$/)
testsContext.keys().forEach(testsContext)

const mountNodeId = 'HSBluePortalContainer'

const addMountNode = () => {
  removeMountNode()
  const node = document.createElement('div')
  node.id = mountNodeId
  node.innerHTML = '<div id="HSBluePortalContainer"></div>'
  document.body.appendChild(node)
}

const removeMountNode = () => {
  const node = document.getElementById(mountNodeId)
  if (node) {
    node.parentNode.removeChild(node)
  }
}

const getMountNode = () => {
  return document.getElementById(mountNodeId)
}

const mountHelper = component => {
  window.BluePortalWrapperGlobalManager = null
  addMountNode()
  const wrapper = mount(component, { attachTo: getMountNode() })
  return wrapper
}

const $mountHelper = component => {
  const wrapper = mountHelper(component)
  const $wrapper = $(wrapper.getDOMNode())
  return $wrapper
}

global.mount = mountHelper
global.$mount = $mountHelper
global.$ = jQuery
