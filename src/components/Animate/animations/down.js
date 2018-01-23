const amount = -24

export default {
  entering: {
    transform: `translateY(${amount}px)`
  },
  entered: {
    transform: 'translateY(0)'
  },
  exiting: {
    transform: `translateY(${amount}px)`
  }
}
