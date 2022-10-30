import React from 'react';
import classnames from 'classnames';


export interface CalculatorOutputHistoryRenderProps {
    historicalOperations: string[],
    topToBottom?: boolean
}
export function CalculatorOutputHistoryRender({
    historicalOperations,
    topToBottom
}: CalculatorOutputHistoryRenderProps) {
    return (
        <div className={classnames(
            'overflow-y-hidden',
            'bg-[#262A36]',
            // 'max-h-24'
        )}>
            {historicalOperations.map((operation, index) => (
                <div className={classnames(
                    'text-white',
                    `text-white/${100 - 10 * index}`, //TODO: Need to figure out why the opacity does not work
                    'text-lg',
                    'text-end'
                )}>
                    {operation}
                </div>
            ))}
        </div>
    );
}