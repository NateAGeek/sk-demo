import React from 'react';
import classnames from 'classnames';

export interface CalculatorConvertButtonRenderProps {
    convertText: string,
    selected: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    style?: React.CSSProperties,
    classNames?: classnames.ArgumentArray
}

/**
 * Renders a rendered convert calculator button
 * @param {CalculatorConvertButtonRenderProps} props props used to render a convert calculator button
 * @return {JSX.Element}
 */
export function CalculatorConvertButtonRender({
  convertText,
  selected = false,
  onClick,
  style,
  classNames,
}: CalculatorConvertButtonRenderProps) {
  return (
    <button style={style} className={classnames(
      'py-1',
      'px-3',
      'bg-[#9FA8C6]',
      'text-white',
      'rounded-lg',
      'text-lg',
      'active:opacity-50',
      {
        'border-2': selected,
        'border-[#D37FCC]': selected,
      },
      classNames,
    )}
    onClick={onClick}
    >
      {convertText}
    </button>
  );
}
