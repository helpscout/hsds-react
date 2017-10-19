const amount = -24

export default {
  onEnter: {
    translateX: [amount, 0]
  },
  onExit: {
    translateX: [0, amount]
  }
}
