import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { NavLink } from '../components/NavLink'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/ButtonGlowingBackground',
  component: NavLink
} as ComponentMeta<typeof NavLink>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NavLink> = () => (
  <ul>
    <NavLink href=''>Link A</NavLink>
    <NavLink href=''>Link B</NavLink>
    <NavLink href=''>Link C</NavLink>
  </ul>
)

export const Primary = Template.bind({})
