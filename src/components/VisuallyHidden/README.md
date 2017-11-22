# Visually hidden

A VisuallyHidden component is tiny helper that hides content from view, without hiding from accessibility devices like screen readers.

Typically, you would add text inside of a VisuallyHidden component. However, you may add selectors and other React components as well.


## Example

```jsx
<VisuallyHidden>Label</VisuallyHidden>
```

### Focusable

```jsx
<VisuallyHidden focusable><a href="#">Skip to content</a></VisuallyHidden>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | string | Custom class names to be added to the component. |
| focusable | boolean | Enables the ability to be tab focused. |
