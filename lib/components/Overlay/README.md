# Overlay

An Overlay component provides the backdrop for UI like Popovers or Modals.

## Example

```html
<Overlay onClick={closeMyModal} />
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | string | Custom class names to be added to the component. |
| onClick | function | Callback when the component is clicked. |
| style | object | Inline-styles for the component. |


### Child components

Although the Overlay component accepts child components, it is recommended that Popover or Modal content float **on top** rather than within. This makes it much easier to delegant click events.