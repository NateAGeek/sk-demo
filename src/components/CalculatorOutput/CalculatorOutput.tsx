import classnames from 'classnames';
import { CalculatorConvertButtonRender, CalculatorConvertButtonRenderProps } from './CalculatorConvertButton/CalculatorConvertButton';
import { CalculatorOutputHistoryRender } from './CalculatorOutputHistory/CalculatorOutputHistory';

export interface CalculatorOutputRenderProps {
    input: string,
    convertOptions: CalculatorConvertButtonRenderProps[], //TODO: change this fro props
    calculationHistory: string[],
    onInputChange?: React.ChangeEventHandler<HTMLInputElement>
}

export function CalculatorOutputRender({
    input,
    convertOptions,
    calculationHistory,
    onInputChange
}: CalculatorOutputRenderProps) {
    return (
        <div className={classnames(
            'bg-[#262A36]',
            'flex',
            'flex-col',
            'flex-grow'
        )}>
            <div className={classnames(
                'flex',
                'justify-end',
                'my-2',
            )}>
                {convertOptions.map((convertProp, index) => (
                    <CalculatorConvertButtonRender key={`convert-item-${index}`} {...convertProp} classNames={[
                        'mr-2'
                    ]}/>
                ))}
            </div>
            <CalculatorOutputHistoryRender calculationHistory={calculationHistory}/>
            <input type={'text'} className={classnames(
                'text-white',
                'text-right',
                'text-6xl',
                'bg-[#262A36]',
                'border-transparent',
                'focus:border-transparent',
                'focus:ring-0'
            )} value={input} onChange={onInputChange}></input>
        </div>
    );
}