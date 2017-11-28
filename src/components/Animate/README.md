# Animate

An Animate component is a wrapper component that provides CSS-based animations. Animate is an extension of `<Transition>` from [`react-transition-group`](https://github.com/reactjs/react-transition-group/).


## Example

##### Fade in animation

```jsx
<Animate sequence='fadeIn'>
  <Avatar name="Will Ferrell" image="will.png" />
</Animate>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| animateOnMount | `bool` | Automatically animates when component is rendered. Default is `true` |
| className | `string` | Custom class names to be added to the component. |
| in | `bool` | Programatically triggering the animation. |
| duration | `number` | The duration (in `ms`) for the animation sequence. |
| sequence | `string` | Names of animation styles to apply. |
| wait | `number` | The duration (in `ms`) to apply/remove the animations. |


## Sequences

| Name | Description |
| --- | --- |
| `down` | Animates component down into it's natural position. |
| `fadeIn` | Fades the component into view. |
