/* eslint-env jest */

import React from 'react'
import { render } from '@testing-library/react'

import App from '../pages/index.js'

describe('With React Testing Library', () => {
  it('Shows "Simple Storybook Example" and "Hello world!"', () => {
    const { container, getByText } = render(<App />)
    expect(container.firstChild.childNodes[0]).toBe(getByText(/Simple Storybook Example/i))
    expect(container.firstChild.childNodes[1]).toBe(getByText(/Hello World/i));
  })
})

describe('With React Testing Library Snapshot', () => {
  it('Should match Snapshot', () => {
    const { asFragment } = render(<App />)

    expect(asFragment()).toMatchSnapshot()
  })
})
