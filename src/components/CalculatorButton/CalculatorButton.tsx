import React from "react";
import classnames from 'classnames';

export interface CalculatorButtonProps {
    textOrIcon: string | JSX.Element,
    type: 'primary' | 'secondary' | 'trinary',
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    classNames?: classnames.ArgumentArray
}

export default function CalculatorButton({
    textOrIcon,
    type,
    classNames,
    onClick
}: CalculatorButtonProps) {
    return (
        <button className={classnames(
            'w-16',
            'h-16',
            'text-4xl',
            'rounded-md',
            'sm:w-24',
            'sm:h-24',
            {   //TODO: simplify this with theme colors and just using a string interpolation 
                'bg-[#4D5880]': type === 'primary',
                'bg-[#D37FCC]': type === 'secondary',
                'bg-[#9FA8C6]': type === 'trinary',
                'text-[#D6D8DA]': type === 'primary',
                'text-white': type === 'secondary',
                'text-[#3C4564]': type === 'trinary',
            },
            classNames
            )} onClick={onClick}>
            {textOrIcon}
        </button>
    );
}