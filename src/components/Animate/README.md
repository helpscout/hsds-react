# Animate

An Animate component is a wrapper component that provides CSS-based animations. Animate is an extension of `<Transition>` from [`react-transition-group`](https://github.com/reactjs/react-transition-group/).


## Example

##### Fade in animation

```jsx
<Animate sequence='fade'>
  <Avatar name="Will Ferrell" image="will.png" />
</Animate>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| animateOnMount | `bool` | Automatically animates when component is rendered. Default is `true` |
| block | `bool` | Applies `display: block` to the component. |
| className | `string` | Custom class names to be added to the component. |
| delay | `number` | The duration (in `ms`) to delay the animations. |
| duration | `number` | The duration (in `ms`) for the animation sequence. Default `200`. |
| easing | `string` | Determines the CSS easing transition function. Default `ease-in-out`. |
| in | `bool` | Programatically triggering the animation. |
| inline | `bool` | Applies `display: inline` to the component. |
| inlineBlock | `bool` | Applies `display: inline-block` to the component. |
| mountOnEnter | `bool` | Mounts child component as soon as `Animate` mounts. Default is `true` |
| mountOnExit | `bool` | Unmounts child component as soon as `Animate` unmounts. Default is `true` |
| onEnter | `function` | Callback before the component's `enter` animation sequence. |
| onEntered | `function` | Callback after the component's `enter` animation sequence. |
| onEntering | `function` | Callback during the component's `enter` animation sequence. |
| onExit | `function` | Callback after the component's `exit` animation sequence. |
| onExit | `function` | Callback before the component's `exit` animation sequence. |
| onExiting | `function` | Callback during the component's `exit` animation sequence. |
| sequence | `string` | Names of animation styles to apply. |
| timeout | `number` | The duration (in `ms`) to apply/remove the animations. Default `0`. |
| transitionProperty | `string` | Determines the CSS transition property. Default `all`. |
