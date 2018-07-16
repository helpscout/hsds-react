# Image

The Image component is a very light-weight wrapper for the default HTML `<img>` selector.

## Example

```jsx
<Image src="elf_arctic_puffin.jpg" alt="Not now, Arctic Puffin!" width="200" />
```

## Props

| Prop      | Type     | Description                                      |
| --------- | -------- | ------------------------------------------------ |
| alt       | `string` | Alt description for the image.                   |
| block     | `bool`   | Enables `display: block` for the image.          |
| className | `string` | Custom class names to be added to the component. |
| height    | `number` | Width for the image.                             |
| maxHeight | `number` | Max height for the image.                        |
| maxWidth  | `number` | Max width for the image.                         |
| src       | `string` | Source for the image. Requried.                  |
| style     | `object` | Inline-styles for the image.                     |
| title     | `string` | Title description for the image.                 |
| width     | `number` | Width for the image.                             |

## Future enhancements

At the moment, this component doesn't do too much beyond providing responsive styling with CSS. However, using this component over the default `<img>` will allow us to provide image-based enhancements at scale when the time comes.

Enhancements can include:

* Lazy-loading
* `src-set` support
