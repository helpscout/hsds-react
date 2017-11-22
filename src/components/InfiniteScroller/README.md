# InfiniteScroller

An InfiniteScroller component makes it easy to handle dynamically adding content based on scroll actions.


## Example

```jsx
<Scrollable>
  ...
  <InfiniteScroller onLoading={loadMoreContent} />
</Scrollable>
```


## `isLoading` state

InfiniteScroller automatically fires the `onLoading` callback once it is visible within the viewport (and a scroll action as taken place).

Once that callback is fired, InfiniteScroller's internal `isLoading` state is locked at `true`, until it is resolved either with a callback function, or a `isLoading` prop change.


### Callback-based update

```jsx
const loadMoreContent = (onLoadedCallback) => {
  // Add your async methods there
  // Fire the callback when resolved
  onLoadedCallback()
}

return (
  <Scrollable>
    ...
    <InfiniteScroller onLoading={loadMoreContent} />
  </Scrollable>
)
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| onLoading | `function` | Callback when component becomes visible in the DOM, after scrolling. |
| onLoaded | `function` | Callback when component completes `onLoading`. |
| className | `string` | Custom class names to be added to the component. |
| isLoading | `boolean` | Sets the component into an `isLoading` state. |
| offset | `number` | Top buffer (`px`) before infinite scroll is triggered. |
| getScrollParent | `function` | Callback to retrieve the parentNode to listen for scroll events. |
| scrollParent | `DOM node` | DOM node to listen to scroll events on, instead of closest parentNode (default). |
