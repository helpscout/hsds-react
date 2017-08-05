# Workflow

Below is a list of items related to the bundling / development workflow for Blue.

### JS

* [x] Figure out how to bundle/build the components for `import` use via npm (done with Webpack)
* [x] Pick a test library. (We're going with Jest + Enzyme!)
* [x] Start writing tests!
* [x] Implement some sort of linter (Went with Standardjs)
* [ ] Implement some sort of [accessibility linter](https://github.com/reactjs/react-a11y)
* [ ] Remove bunch of dependencies added with `create-react-app`

#### Accessibility

With these self-contained components, we should strive to implement accessibility support where possible (by using `aria` tags, `title`, etc…).


### CSS

* [ ] Figure out some why to bundle/inline/build the CSS into the React components.
  * Thought! Since Webpack is compiling everything to a single `index.js` file… maybe the `.scss` files can be imported into the individual components, which will get compiled when Webpack does it's thing. Need to test.
