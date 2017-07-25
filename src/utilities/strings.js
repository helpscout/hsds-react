export const nameToInitials = (name = '') => {
  return name.replace(/\W*(\w)\w*/g, '$1').toUpperCase();
};
