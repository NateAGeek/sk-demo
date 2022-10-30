import classnames from 'classnames';
import { CalculatorConvertButtonRender, CalculatorConvertButtonRenderProps } from './CalculatorConvertButton/CalculatorConvertButton';
import { CalculatorOutputHistoryRender } from './CalculatorOutputHistory/CalculatorOutputHistory';

export interface CalculatorOutputRenderProps {
    output: string,
    convertOptions: CalculatorConvertButtonRenderProps[], //TODO: change this fro props
    historyCalculations: string[],
    onOutputChange?: React.ChangeEventHandler<HTMLInputElement>
}

export function CalculatorOutputRender({
    output,
    convertOptions,
    historyCalculations,
    onOutputChange
}: CalculatorOutputRenderProps) {
    return (
        <div className={classnames(
            'bg-[#262A36]',
            'flex',
            'flex-col'
        )}>
            <div className={classnames(
                'flex',
                'justify-end',
                'my-2',
            )}>
                {convertOptions.map(convertProp => (
                    <CalculatorConvertButtonRender {...convertProp} classNames={[
                        'mr-2'
                    ]}/>
                ))}
            </div>
            <div className={classnames('m-2', 'flex-grow')}>
                <CalculatorOutputHistoryRender historicalOperations={historyCalculations}/>
            </div>
            <input type={'text'} className={classnames(
                'text-white',
                'text-right',
                'text-6xl',
                'bg-[#262A36]',
                'border-transparent',
                'focus:border-transparent',
                'focus:ring-0'
            )} value={output} onChange={onOutputChange}></input>
        </div>
    );
}