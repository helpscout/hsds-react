# SleepDetector

A SleepDetector component detects when the computer has gone to sleep or the tab has otherwise had its execution interrupted. This is useful in situations where we want to detect when the page has been inactive, which may mean it has drifted out of date in a real-time application and is need of a "refresh". It works along the same lines as this [clever trick](https://blog.alexmaccaw.com/javascript-wake-event).

## Example

```jsx
<SleepDetector onWake={refreshPage} />
```

## Props

| Prop     | Type       | Description                                                           |
| -------- | ---------- | --------------------------------------------------------------------- |
| onWake   | `function` | Callback to execute when we detect that the page has woken from sleep |
| interval | `number`   | How often (ms) to check for inactive tab (default is 10000)           |
| buffer   | `number`   | How long (ms) of a delay to treat as a "sleep" event                  |
