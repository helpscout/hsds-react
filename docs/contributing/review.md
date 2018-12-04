# Submitting for review

In this guide, we'll walk through add submitting for our [fully test](testing.md) [custom `Strong` component](creating.md) for review!

## Create a pull request

After checking in all of your wonderful changes to your `strong-component` git branch. Push it up to [Github](https://github.com/helpscout/hsds-react).

[Create a new pull request](https://github.com/helpscout/hsds-react/compare) against the `master` branch!

## Description and labels

Be descriptive of your changes! The more the better. If possible, include screenshots or GIF demos. Add the [appropriate label(s)](https://github.com/helpscout/hsds-react/labels) that describe your changes.

Since we're adding a brand new component, we'll add the `feature` label.

## Continuous Integration

Every pull request automatically fires off a [Travis build](https://travis-ci.org/helpscout/hsds-react). Once that passes, it'll generate a [code coverage score](https://coveralls.io/).

The Travis build **must be green** and the coverage score **must be 100%** before merging into `master`.

## Review

Tag one of the [`@helpscout` team members](https://github.com/helpscout/hsds-react/graphs/contributors) for review.

## Next

🚀 All green? All good 😎. Once that gets merged in, we [can publish a release](release.md)!

## See also

* [Travis CI](https://travis-ci.org/)
* [Coveralls](https://coveralls.io/)
