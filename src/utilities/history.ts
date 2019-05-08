export const sanitizePathName = (pathname: string): string => {
  return pathname.replace(/\:(.*)\//g, '')
}

export const generateKey = (): string => {
  return Math.random()
    .toString(36)
    .substr(2, 5)
}

// Source
// Modified from:
// https://github.com/malbernaz/tiny-history/blob/master/index.js
export const createLocation = (
  path,
  state?: any,
  key?: any,
  location: any = {}
) => {
  const a = document.createElement('a')
  a.href = path || location.pathname
  const pathname = sanitizePathName(a.pathname)
  const locationKey = key || (path && generateKey())

  return {
    state: state || null,
    pathname:
      '/' +
      pathname
        .split('/')
        .filter(Boolean)
        .join('/'),
    search: a.search,
    hash: a.hash,
    key: locationKey,
  }
}
