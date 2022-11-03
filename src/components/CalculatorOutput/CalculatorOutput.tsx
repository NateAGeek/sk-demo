import React from 'react';
import classnames from 'classnames';
import {
  CalculatorConvertButtonRender,
  CalculatorConvertButtonRenderProps,
} from './CalculatorConvertButton/CalculatorConvertButton';
import {CalculatorOutputHistoryRender} from './CalculatorOutputHistory/CalculatorOutputHistory';

export interface CalculatorOutputRenderProps {
    input: string,
    convertOptions: CalculatorConvertButtonRenderProps[],
    calculationHistory: string[],
    onInputChange?: React.ChangeEventHandler<HTMLInputElement>
}

/**
 * Render the calculator output component
 * @param {CalculatorOutputRenderProps} props output props
 * @return {JSX.Element} Rendered details of the Calculator output
 */
export function CalculatorOutputRender({
  input,
  convertOptions,
  calculationHistory,
  onInputChange,
}: CalculatorOutputRenderProps) {
  return (
    <div className={classnames(
      'bg-[#262A36]',
      'flex',
      'flex-col',
      'flex-grow',
    )}>
      <div className={classnames(
        'flex',
        'justify-end',
        'my-2',
      )}>
        {convertOptions.map((convertProp, index) => (
          <CalculatorConvertButtonRender key={`convert-item-${index}`} {...convertProp} classNames={[
            'mr-2',
          ]}/>
        ))}
      </div>
      <div className='flex flex-col flex-grow lg:flex-col-reverse'>
        <CalculatorOutputHistoryRender calculationHistory={calculationHistory}/>
        <input type={'text'} className={classnames(
          'text-white',
          'text-right',
          'text-6xl',
          'bg-[#262A36]',
          'border-transparent',
          'focus:border-transparent',
          'focus:ring-0',
        )} value={input} onChange={onInputChange}></input>
      </div>
    </div>
  );
}
