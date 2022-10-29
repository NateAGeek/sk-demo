import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CalculatorButton from './CalculatorButton';

export default {
  component: CalculatorButton,
} as ComponentMeta<typeof CalculatorButton>;

const Template: ComponentStory<typeof CalculatorButton> = (args) => <CalculatorButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    textOrIcon: '0',
    type: 'primary'
};
export const Secondary = Template.bind({});
Secondary.args = {
    textOrIcon: '0',
    type: 'secondary'
};
export const Trinary = Template.bind({});
Trinary.args = {
    textOrIcon: '0',
    type: 'trinary'
};