export const getSequenceNames = (sequence) => {
  return Array.isArray(sequence) ? sequence
    : typeof sequence === 'string' && sequence.length
      ? sequence.trim().split(' ').filter(n => n !== '')
      : []
}
