beforeEach(() => {
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb())
})

afterEach(() => {
  window.requestAnimationFrame.mockRestore()
})
