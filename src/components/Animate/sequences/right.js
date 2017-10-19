const amount = -24

export default {
  onEnter: {
    translateX: [0, amount]
  },
  onExit: {
    translateX: [amount, 0]
  }
}
