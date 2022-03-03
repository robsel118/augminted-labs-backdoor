import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TokenPrice } from '../components/TokenPrice'
import { Token } from '../config/constants'
import { MoralisProvider } from 'react-moralis'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/TokenPrice',
  component: TokenPrice,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof TokenPrice>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TokenPrice> = (args) => (
  <MoralisProvider
    appId={process.env.REACT_APP_APP_ID || ''}
    serverUrl={process.env.REACT_APP_SERVER_URL || ''}
  >
    <TokenPrice {...args} />
  </MoralisProvider>
)

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  token: Token.RWASTE
}
