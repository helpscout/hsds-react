export default {
  onMount: {
    perspective: 400,
  },
  onEntering: {
    rotateX: [80, 0]
  },
  onExiting: {
    transform: 'perspective(400px)'
  }
}
