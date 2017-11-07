# Item

A Timeline.Item component renders individual items within a [Timeline](./Timeline.md).


## Example

```jsx
<Timeline>
  <Timeline.Item>
    60% of the time, it works everytime.
  </Timeline.Item />
</Timeline>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| onMouseEnter | function | Callback when mouse enters the component. |
| onMouseLeave | function | Callback when mouse leaves the component. |
| className | string | Custom class names to be added to the component. |
| timestamp | string | Renders a [Timestamp](../../Timestamp) when component is [hovered](../../HoverWrapper). |
