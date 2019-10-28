# ConditionList

A ConditionList contains a collectino of [Conditions](../Condition). This component automatically renders [Condition.Operators](../Condition) (`and`) between every Condition.

When rendered within a [Page](../Page) component, ConditionList will automatically have `isWithOffset` set to `true` (by default).

## Example

```jsx
<ConditionList>
  <Condition>...</Condition>
  <Condition>...</Condition>
  <Condition>...</Condition>
</ConditionList>
```

## Props

| Prop           | Type       | Default | Description                                                             |
| -------------- | ---------- | ------- | ----------------------------------------------------------------------- |
| className      | `string`   |         | The className of the component.                                         |
| ref            | `Function` |         | Retrieve the inner DOM node.                                            |
| isAddEnabled   | `boolean`  | `true`  | Renders an inner [Condition.AddButton](../Condition).                   |
| isWithOffset   | `boolean`  | `false` | Renders component with negative left/right margins.                     |
| onAdd          | `Function` |         | Callback when the inner [Condition.AddButton](../Condition) is clicked. |
| scrollDuration | `number`   | `300`   | Time (ms) it takes to scroll into view.                                 |
| scrollOffset   | `number`   | `200`   | Amount (px) used to calculate scrolling into view.                      |
