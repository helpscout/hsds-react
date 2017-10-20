const amount = -24

export default {
  onEntering: {
    translateY: [amount, 0]
  },
  onExiting: {
    translateY: [0, amount]
  }
}
