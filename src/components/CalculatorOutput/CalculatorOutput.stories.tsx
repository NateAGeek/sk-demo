import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {CalculatorOutputRender} from './CalculatorOutput';

export default {
  component: CalculatorOutputRender,
} as ComponentMeta<typeof CalculatorOutputRender>;

const Template: ComponentStory<typeof CalculatorOutputRender> = (args) => <CalculatorOutputRender {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    output: '123.12',
    convertOptions: [
      {
        convertText: 'ETH',
        selected: true,
      },
      {
        convertText: 'GWEI',
        selected: false,
      },
      {
        convertText: 'WEI',
        selected: false,
      }
    ],
    historyCalculations: [
      '123 + 32 = 155',
      '123 + 32 = 155',
      '123 + 32 = 155',
      '123 + 32 = 155',
      '123 + 32 = 155',
      '123 + 32 = 155',
      '123 + 32 = 155',
    ]
};
