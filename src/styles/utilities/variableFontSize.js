// @flow
type VariableFontSizeProps = {
  varName: string,
  baseFontSize: number,
  fontSize: number,
}

export const GLOBAL_FONT_SIZE_NAMESPACE = '--BlueConfigGlobalFontSize'
export const VARIABLE_FONT_SIZE_NAMESPACE = 'BlueConfigVariableFontSize'
export const BASE_FONT_SIZE = 13

const defaultProps = {
  varName: VARIABLE_FONT_SIZE_NAMESPACE,
  baseFontSize: BASE_FONT_SIZE,
  fontSize: BASE_FONT_SIZE,
}

/**
 * Generates the CSS style rules for dynamic font-size based on the global
 * font-size. This function uses CSS variables + calc to determine the correct
 * font-size, with a fallback for a px font-size for browsers that don't
 * support CSS variables (IE).
 *
 * @param   {Object} props The properties.
 * @param   {string} props.varName The CSS variable namespace.
 * @param   {number} props.baseFontSize The base font size (13).
 * @param   {number} props.fontSize The desired font size.
 * @returns {string} The compiled CSS styles rules.
 */
const variableFontSize = (
  props: VariableFontSizeProps = defaultProps
): string => {
  const { varName, baseFontSize, fontSize } = { ...defaultProps, ...props }
  const variableNameSpace = `--${varName}-${fontSize.toString()}`

  return `
    ${variableNameSpace}: calc(
        ${fontSize} / ${baseFontSize} *
        var(${GLOBAL_FONT_SIZE_NAMESPACE})
      );
    font-size: ${fontSize}px;
    font-size: var(${variableNameSpace});
  `
}

export default variableFontSize
