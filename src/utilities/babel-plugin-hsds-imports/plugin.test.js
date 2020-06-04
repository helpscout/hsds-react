import pluginTester from 'babel-plugin-tester'
import hsdsImports from './'

pluginTester({
  plugin: hsdsImports,
  snapshot: true,
  tests: [
    {
      title: 'Should not change imports that are not hsds or in the options',
      code: `
      import React from 'react'
      import _ from 'lodash'
      `,
    },
    {
      title: 'Should not change default imports',
      code: `
      import Page from '@helpscout/hsds-react/components/Page'
      `,
    },
    {
      title:
        'Should change destructured hsds imports to default style imports (1 item)',
      code: `
      import { Tooltip } from '@helpscout/hsds-react/components/'
      `,
    },
    {
      title:
        'Should change destructured hsds imports to default style imports (2+ items)',
      code: `
      import { Tooltip, Select } from '@helpscout/hsds-react/components/'
      `,
    },
    {
      title:
        'Should make sure that "components" is in the transformed path in destructured imports',
      code: `
      import { Tooltip, Select } from '@helpscout/hsds-react'
      `,
    },
    {
      title:
        'Should make sure that "components" is in the transformed path in default imports',
      code: `
      import Button from '@helpscout/hsds-react'
      `,
    },
    {
      title: 'Should not change HSDS utilities',
      code: `
      import { getColor } from '@helpscout/hsds-react/styles/utilities/color'
      `,
    },
    {
      title: 'Should work with mixed stuff',
      code: `
      import Button from '@helpscout/hsds-react'
      import Page from '@helpscout/hsds-react/components/Page'
      import { Hello } from '@helpscout/hsds-react'
      import { Tooltip, Select } from '@helpscout/hsds-react/components/'
      import React from 'react'
      import { getColor } from '@helpscout/hsds-react/styles/utilities/color'
      `,
    },
    {
      title: 'Should work with options',
      pluginOptions: {
        packages: ['hsds-react-next'],
      },
      code: `
      import Button from 'hsds-react-next'
      import Page from 'hsds-react-next/components/Page'
      import { Hello } from 'hsds-react-next'
      `,
    },
    {
      title: 'Should work with options (2+)',
      pluginOptions: {
        packages: ['hsds-react-next', '@helpscout/hsds-react'],
      },
      code: `
      import Button from 'hsds-react-next'
      import Page from 'hsds-react-next/components/Page'
      import { Hello } from 'hsds-react-next'
      import { Tooltip, Select } from '@helpscout/hsds-react/components/'
      `,
    },
  ],
})
