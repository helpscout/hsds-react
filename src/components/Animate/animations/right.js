const amount = 24

export default {
  onEntering: {
    translateX: [amount, 0]
  },
  onExiting: {
    translateX: [0, amount]
  }
}
