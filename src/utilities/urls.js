export const normalizeUrl = string => {
  if (!string) {
    return ''
  }

  let url = string

  if (url.search(/^http[s]?:\/\//) === -1) {
    url = `http://${url}`
  }

  return url
}
