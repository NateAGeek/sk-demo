

export interface CalculatorButtonProps {
    textOrIcon: string | JSX.Element,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
}

export default function CalculatorButton({
    textOrIcon,
    onClick
}: CalculatorButtonProps) {

    return (
        <button onClick={onClick}>
            {textOrIcon}
        </button>
    );
}