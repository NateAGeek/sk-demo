import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {CalculatorConvertButtonRender} from './CalculatorConvertButton';

export default {
  component: CalculatorConvertButtonRender,
} as ComponentMeta<typeof CalculatorConvertButtonRender>;

const Template: ComponentStory<typeof CalculatorConvertButtonRender> = (args) => <CalculatorConvertButtonRender {...args} />;

export const Default = Template.bind({});
Default.args = {
  convertText: 'ETH',
};

export const Selected = Template.bind({});
Selected.args = {
  convertText: 'ETH',
  selected: true,
};

