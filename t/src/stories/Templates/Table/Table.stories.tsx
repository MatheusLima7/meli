import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import StoryTable from './Table'

export default {
  title: 'Templates/Table',
  component: StoryTable
}

const Template = (args) => <StoryTable {...args} />

export const Default = Template.bind({})
