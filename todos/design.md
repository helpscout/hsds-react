# Design

Below is a (working) list of design notes/todos.

**[Link to Sketch file on Dropbox](https://www.dropbox.com/s/ycy3ro44reajybr/Blue.sketch?dl=0)**


## Input

The [Input](../src/components/Input) component was the first React component built for Blue. Aesthetics + feature-wise, Input is in a good place. However, there are some pending things we'll need.

* [ ] read-only styles
* [ ] sizes?


## Text (Typography)

We're off to a great start with the [Text](../src/components/Text) component. However, we'll need more info/direction as to how to render things like meta information and the variety of headers.

### Heading

I feel like headings should be a component on their own (`<Heading>`).

* We'll need to know the variety of different heading styles/sizes (and how we wanna name them). (e.g. H1-H6? more sizes? all caps?)


### Text

* Should text sizing be defined by a number? (e.g. `16` = `16px`) Or a label for sizing? (`sm` = `13px`)