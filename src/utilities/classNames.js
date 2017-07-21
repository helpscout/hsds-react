const classNames = (...classes) => {
  return classes.filter(name => name).join(' ');
};

export default classNames;
