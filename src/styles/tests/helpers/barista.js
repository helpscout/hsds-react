import barista from 'seed-barista'

const styles = (content) => {
  const b = barista({ content }).mount()
  b.$ = b.dom.$

  return b
}

export default styles
