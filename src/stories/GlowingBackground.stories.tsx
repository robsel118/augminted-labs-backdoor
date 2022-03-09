import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { GlowingBackground } from 'src/components/GlowingBackground'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/ButtonGlowingBackground',
  component: GlowingBackground,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof GlowingBackground>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GlowingBackground> = () => (
  <GlowingBackground>A glwing background</GlowingBackground>
)

export const Primary = Template.bind({})
