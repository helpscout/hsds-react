const amount = -24

export default {
  onEntering: {
    translateY: [0, amount]
  },
  onExiting: {
    translateY: [amount, 0]
  }
}
