const classNames = (...classes) => {
  return classes
    .filter(name => name && typeof name !== 'boolean')
    .join(' ')
}

export default classNames
