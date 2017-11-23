# Sortable

This component provides the ability to drag sort child components. This component is built on top of [react-sortable-hoc](https://github.com/clauderic/react-sortable-hoc) and enhanced to make it easier to use.


## Example

Any child components placed inside this component automatically become sortable.

```jsx
<Sortable>
  <Card>Jacobim Mugatu</Card>
  <Card>Lord Business</Card>
  <Card>Brennan Huff</Card>
</Sortable>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | string | Custom class names to be added to the component. |
| style | string | Custom styles to be added to the component. |


### react-sortable-hoc Props

This component accepts all props used by [react-sortable-hoc](https://github.com/clauderic/react-sortable-hoc).

| Prop | Type | Description |
| --- | --- | --- |
| axis | string | Items can be sorted horizontally, vertically or in a grid. Possible values: `x`, `y` or `xy` |
| distance | number | If you'd like elements to only become sortable after being dragged a certain number of pixels. Cannot be used in conjunction with the `pressDelay` prop. |
| getContainer | function | Optional function to return the scrollable container element. This property defaults to the `SortableContainer` element itself or (if `useWindowAsScrollContainer` is true) the window. Use this function to specify a custom container object (eg this is useful for integrating with certain 3rd party components such as `FlexTable`). This function is passed a single parameter (the `wrappedInstance` React element) and it is expected to return a DOM element. |
| getHelperDimensions | function | Optional `function({node, index, collection})` that should return the computed dimensions of the SortableHelper. See [default implementation](https://github.com/clauderic/react-sortable-hoc/blob/master/src/SortableContainer/index.js#L58) for more details |
| helperClass | string | You can provide a class you'd like to add to the sortable helper to add some styles to it |
| hideSortableGhost | boolean | Whether to auto-hide the ghost element. By default, as a convenience, React Sortable List will automatically hide the element that is currently being sorted. Set this to false if you would like to apply your own styling. |
| lockAxis | string | If you'd like, you can lock movement to an axis while sorting. This is not something that is possible with HTML5 Drag & Drop |
| lockToContainerEdges | boolean | You can lock movement of the sortable element to it's parent `SortableContainer` |
| lockOffset | boolean | When `lockToContainerEdges` is set to `true`, this controls the offset distance between the sortable helper and the top/bottom edges of it's parent `SortableContainer`. Percentage values are relative to the height of the item currently being sorted. If you wish to specify different behaviours for locking to the *top* of the container vs the *bottom*, you may also pass in an `array` (For example: `["0%", "100%"]`). |
| pressDelay | number | If you'd like elements to only become sortable after being pressed for a certain time, change this property. A good sensible default value for mobile is `200`. Cannot be used in conjunction with the distance prop. |
| pressThreshold | number | Number of pixels of movement to tolerate before ignoring a press event. |
| onSortStart | function | Callback that get's invoked when sorting begins. `function({node, index, collection}, event)` |
| onSortMove | function | Callback that get's invoked during sorting as the cursor moves. `function(event)` |
| onSortEnd | function | Callback that get's invoked when sorting ends. `function({oldIndex, newIndex, collection}, e)` |
| shouldCancelStart | function | This function get's invoked before sorting begins, and can be used to programatically cancel sorting before it begins. By default, it will cancel sorting if the event target is either an `input`, `textarea`, `select` or `option`. |
| useDragHandle | boolean | If you're using the `SortableHandle` HOC, set this to `true` |
| useWindowAsScrollContainer | boolean | If you want, you can set the `window` as the scrolling container |
| transitionDuration | number | The duration of the transition when elements shift positions. Set this to `0` if you'd like to disable transitions |
