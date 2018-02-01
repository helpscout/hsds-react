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
| className | `string` | Custom class names to be added to the component. |
| delay | `number` | The duration (in `ms`) to delay the child animations. |
| duration | `number` | The duration (in `ms`) for the child animation sequence. | 
| stagger | `bool` | Adds an incremental delay between child `Animate` components. |
| staggerDelay | `number` | Amount of time (`ms`) to delay for `stagger`. |
| staggerDuration | `number` | Time (`ms`) to for staggering animation durations. |

See `react-transition-group`'s [documentation](https://reactcommunity.org/react-transition-group/#TransitionGroup) for additional details.
