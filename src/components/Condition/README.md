# Condition

A Condition is a single item that renders within a [ConditionList](../ConditionList). It's values are represented by a collection of [ConditionFields](../ConditionFields) and various Form elements such as [Inputs](../Input) and [Selects](../Select).

## Example

```jsx
<ConditionList>
  <Condition>
    <ConditionField>...</ConditionField>
  </Condition>
</ConditionList>
```

## Props

| Prop      | Type         | Default | Description                                                        |
| --------- | ------------ | ------- | ------------------------------------------------------------------ |
| className | `string`     |         | The className of the component.                                    |
| innerRef  | `Function`   |         | Retrieve the inner DOM node.                                       |
| isWithAnd | `boolean`    |         | Renders the "And" operator (top).                                  |
| options   | `Array<any>` |         | Collection of condition values, rendered by a [Select](../Select). |
| onChange  | `Function`   |         | Callback when the `option` [Select](../Select) has changed.        |
| value     | `string`     |         | The value of the condition ([Select](../Select)).                  |

---

# Condition.Operator

A Condition.Operator renders an "And" or "Or" interface, used to visually group Conditions or [ConditionFields](../ConditionField) together. This component is used internally by Condition and [ConditionField](../ConditionField).

## Props

| Prop         | Type       | Default | Description                     |
| ------------ | ---------- | ------- | ------------------------------- |
| className    | `string`   |         | The className of the component. |
| innerRef     | `Function` |         | Retrieve the inner DOM node.    |
| isBorderless | `boolean`  | `true`  | Renders a white border.         |
| type         | `string`   | `or`    | The operator. (`and`/`or`)      |

---

# Condition.AddButton

A Condition.AddButton renders an "And" or "Or" interface. It is an action used to add Conditions or [ConditionFields](../ConditionField). This component is used internally by Condition and [ConditionField](../ConditionField).

## Props

| Prop           | Type       | Default | Description                                        |
| -------------- | ---------- | ------- | -------------------------------------------------- |
| className      | `string`   |         | The className of the component.                    |
| innerRef       | `Function` |         | Retrieve the inner DOM node.                       |
| isBorderless   | `boolean`  | `true`  | Renders a white border.                            |
| onClick        | `Function` |         | Callback when component is clicked.                |
| scrollDuration | `number`   | `300`   | Time (ms) it takes to scroll into view.            |
| scrollOffset   | `number`   | `200`   | Amount (px) used to calculate scrolling into view. |
| type           | `string`   | `or`    | The operator. (`and`/`or`)                         |
