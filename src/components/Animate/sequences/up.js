const amount = -24

export default {
  onEnter: {
    translateY: [0, amount]
  },
  onExit: {
    translateY: [amount, 0]
  }
}
