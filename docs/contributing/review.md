# Submitting for review

In this guide, we'll walk through submitting for our [fully test](testing.md) [custom `Strong` component](creating.md) for review!

## Create a pull request

After checking in all of your wonderful changes to your `strong-component` git branch. Push it up to [Github](https://github.com/helpscout/hsds-react).

[Create a new pull request](https://github.com/helpscout/hsds-react/compare) against the `main` branch!

## Description and labels

Be descriptive of your changes! The more the better. If possible, include screenshots or GIF demos. Add the [appropriate label(s)](https://github.com/helpscout/hsds-react/labels) that describe your changes.

Since we're adding a brand new component, we'll add the `feature` label.

## Assigning Reviewers

Assign or `@` at least one code reviewer and one design reviewer. This is required if you're creating a brand new component. If you're unsure who to tag, default to [@itsjonq](https://github.com/itsjonq) and [@digitaldesigner](https://github.com/digitaldesigner).

## Deploy Preview

A [Netlify](https://www.netlify.com/) deploy preview for your Pull Request will automatically be generated. To make it easier for reviewers to QA your updates, provide them with a direct link to your Story either in the Pull Request description or as an additional Github comment.

## Continuous Integration

Every pull request automatically fires off a [Travis build](https://travis-ci.org/helpscout/hsds-react). Once that passes, it'll generate a [code coverage score](https://coveralls.io/).

The Travis build **must be green** and the coverage score **must be 100%** before merging into `main`.

## Review

Tag one of the [`@helpscout` team members](https://github.com/helpscout/hsds-react/graphs/contributors) for review.

## Next

🚀 All green? All good 😎. Once that gets merged in, we [can publish a release](release.md)!

## See also

- [Travis CI](https://travis-ci.org/)
- [Coveralls](https://coveralls.io/)
