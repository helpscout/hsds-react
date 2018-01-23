const amount = 24

export default {
  entering: {
    transform: `translateX(${amount}px)`
  },
  entered: {
    transform: 'translateY(0)'
  },
  exiting: {
    transform: `translateX(${amount}px)`
  }
}
