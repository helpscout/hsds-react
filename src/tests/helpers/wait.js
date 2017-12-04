const wait = (time = 0) => {
  return new Promise((resolve, reject) => {
    let waitTime = setTimeout(() => {
      clearTimeout(waitTime)
      resolve()
    }, time)
  })
}

export default wait
