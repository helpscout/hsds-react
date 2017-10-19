const amount = -24

export default {
  onEnter: {
    translateY: [amount, 0]
  },
  onExit: {
    translateY: [0, amount]
  }
}
