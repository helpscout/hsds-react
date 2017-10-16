# EventListener

A EventListener is a helper component that automatically handles the binding and unbinding of events.

EventListener is used as a child component, as it's `window` on/off bindings happen automatically as the parent component mounts and unmounts.


## Example

```html
<MyComponent>
  <EventListener event='resize' handler={surprise} />
  ...
</MyComponent>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| event | string | A Javascript event. |
| handler | function | Callback when the event is triggered. |
| scope | element | Node element to capture the event. Default is `window`. |
