import React from 'react'

import { storiesOf } from '@storybook/react'
import HelloWorld from '../components'

storiesOf('HelloWorld', module).add('simple component', () => <HelloWorld />)
