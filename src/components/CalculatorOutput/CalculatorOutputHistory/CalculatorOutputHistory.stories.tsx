import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {CalculatorOutputHistoryRender} from './CalculatorOutputHistory';

export default {
  component: CalculatorOutputHistoryRender,
} as ComponentMeta<typeof CalculatorOutputHistoryRender>;

const Template: ComponentStory<typeof CalculatorOutputHistoryRender> = (args) => <CalculatorOutputHistoryRender {...args} />;

export const Default = Template.bind({});
Default.args = {
  calculationHistory: [
    '123 + 32 = 155',
    '123 + 32 = 155',
    '123 + 32 = 155',
    '123 + 32 = 155',
    '123 + 32 = 155',
    '123 + 32 = 155',
    '123 + 32 = 155',
  ],
};

