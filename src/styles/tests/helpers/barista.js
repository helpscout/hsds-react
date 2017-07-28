import barista from 'seed-barista'
import jQuery from 'jquery'

const styles = (content) => {
  jQuery.prototype.prop = jQuery.prototype.css

  const b = barista({ content }).mount()
  b.$ = b.dom.$ = b.dom.jQuery = jQuery

  return b
}

export default styles
