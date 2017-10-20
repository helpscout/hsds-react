const amount = -24

export default {
  onEntering: {
    translateX: [0, amount]
  },
  onExiting: {
    translateX: [amount, 0]
  }
}
