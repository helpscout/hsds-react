export interface InfiniteScrollerProps {
  className: string
  offset: number
  isLoading: boolean
  loading: boolean
  scrollParent: HTMLElement
  getScrollParent: (...args: any[]) => HTMLElement | Window | null
  onLoading: (fn) => void
  onLoaded: () => void
  onScroll: (event, props) => void
}

export interface InfiniteScrollerState {
  isLoading: boolean
  nodeScope: HTMLElement | Window
}
