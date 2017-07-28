import barista from 'seed-barista'

const styles = (content) => {
  const b = barista({ content }).mount()
  const css = b.css

  b.dom.$('head').append(`<style>${css}</style>`)
  b.$ = b.dom.$

  return b
}

export default styles
