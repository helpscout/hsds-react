# AnimateGroup

This component is a light wrapper for `TransitionGroup` from the [react-transition-group](https://github.com/reactjs/react-transition-group) library.


## Example

```jsx
<AnimateGroup>
  <Animate>
    ...
  </Animate>
</AnimateGroup>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| stagger | `bool` | Adds an incremental delay between child `Animate` components. |
| staggerDelay | `number` | Amount of time (`ms`) to delay for `stagger`. |

See `react-transition-group`'s [documentation](https://reactcommunity.org/react-transition-group/#TransitionGroup) for additional details.
