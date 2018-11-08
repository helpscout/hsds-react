type HTMLNode = HTMLElement | any

declare module 'closest' {
  function closest(node: HTMLNode, selector: string): HTMLElement
  export = closest
}
