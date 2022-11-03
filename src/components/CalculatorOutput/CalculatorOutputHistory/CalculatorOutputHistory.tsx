import React from 'react';
import classnames from 'classnames';

export interface CalculatorOutputHistoryRenderProps {
    calculationHistory: string[],
    topToBottom?: boolean
}

/**
 * Renders the output history of the calculator
 * @param {CalculatorOutputHistoryRenderProps} props
 * @return {JSX.Element}
 */
export function CalculatorOutputHistoryRender({
  calculationHistory,
}: CalculatorOutputHistoryRenderProps) {
  return (
    <div className={classnames(
      'overflow-y-hidden',
      'bg-[#262A36]',
      'flex',
      'flex-col',
      'lg:flex-col-reverse',
      'flex-grow',
      'justify-end',
    )}>
      {calculationHistory.map((calculation, index) => (
        <div
          key={`operation-history-${index}`}
          style={{
            opacity: (100 - 10 * (calculationHistory.length - index))/100,
          }}
          className={classnames(
            'text-white',
            'text-lg',
            'text-end',
          )}>
          {calculation}
        </div>
      ))}
    </div>
  );
}
