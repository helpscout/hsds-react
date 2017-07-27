export const nameToInitials = (name = '') => {
  const words = name.split(' ')
    .map(w => w[0])
    .map(w => w.toUpperCase())
  
  return words.length === 1 ? words[0] : words[0] + words[words.length - 1]
}
