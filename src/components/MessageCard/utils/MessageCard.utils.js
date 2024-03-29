export const messageVariableClassName = 'hsds-message-card-variable'

/**
 * This function replaces all occurrences of variables in provided string with human friendly text
 * They would be replaced with fallback text, if present. If no fallback text, label from variable would be used
 * Only variables provided in parameter would be replaced, others are kept untouched in the raw version
 *
 * Variable raw text is replaced with <span class="hsds-message-card-variable"> and <span class="hsds-message-card-variable__text"> elements.
 * Two elements are necessary to properly insert ellipsis for longer variables, and keep the proper styling
 *
 * @param text {String} text to replace variables within (if any)
 * @param variables {Array<{id: String, display: String}>} list of variables to replace
 */
export const replaceMessageVariables = (text = '', variables = []) => {
  if (variables.length === 0) {
    return text
  }

  // Regex to match the following cases:
  // 1) {%variableName,fallback=Fallback%}
  // 2) {%variableName,fallback=%}
  // 3) {%variableName%}
  // 4) {%variableName,fallback=Fallback with % sign%}
  // There are 3 groups, from left: variable name, fallback presence (optional), fallback value (optional)
  // (.*?(?=%}) is a group that finds fallback value, up until it reaches first `%}` group of characters
  const regex = /{%([^,%]+)(,fallback=(.*?(?=%})))?%}/g

  const replacer = (match, variableId, fallbackConfig, fallback) => {
    const variable = variables.find(variable => variable.id === variableId)
    if (variable) {
      const variableText = !fallback ? variable.display : fallback
      return `<span class="${messageVariableClassName}" title="${variableText}"><span class="${messageVariableClassName}__text">${variableText}</span></span>`
    }
    return match
  }

  return text.replace(regex, replacer)
}
