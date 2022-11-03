import React, {useMemo, useState} from 'react';
import classnames from 'classnames';

import CalculatorButton from './components/CalculatorButton/CalculatorButton';
import {CalculatorOutputRender} from './components/CalculatorOutput/CalculatorOutput';
import {CalculatorConvertButtonRenderProps} from
  './components/CalculatorOutput/CalculatorConvertButton/CalculatorConvertButton';
import {
  calculate,
  CalculationValue,
  CalculatorOperationSupport,
  convertToWeiCalculationValue,
  Currencies,
  weiToCurrencyString,
} from
  './utils/Currencies';

const validEthAndGweiNumberInput = /^((\.{0,1}[0-9]*)|([0-9]+\.{0,1}[0-9]*))$/;
const validWeiNumberInput = /^[0-9]*$/;

/**
 * Returns a functional Eth, Gwei, Wei calculator
 * @return {JSX.Element}
 */
export default function Calculator() {
  const [currentInput, setCurrentInput] = useState<CalculationValue>({
    stringValue: '',
    currency: Currencies.WEI,
  });
  const [previousInput, setPreviousInput] = useState<CalculationValue>({
    stringValue: '',
    currency: Currencies.WEI,
  });
  const [currentSelectedCurrency, setCurrentSelectedCurrency] = useState<Currencies>(Currencies.WEI);
  const [selectedOperation, setSelectedOperation] = useState<CalculatorOperationSupport>();
  const [calculationHistory, setCalculationHistory] = useState<string[]>([]);

  const convertOptions = useMemo<CalculatorConvertButtonRenderProps[]>(() => ([
    Currencies.ETH,
    Currencies.GWEI,
    Currencies.WEI,
  ].map((currency) => ({
    convertText: Currencies[currency],
    selected: currentSelectedCurrency === currency,
    onClick: () => {
      setCurrentSelectedCurrency(currency);
      setCurrentInput({
        stringValue: weiToCurrencyString(
          convertToWeiCalculationValue(currentInput.stringValue, currentInput.currency),
          currency,
        ),
        currency: currency,
      });
    },
  }))), [currentSelectedCurrency, currentInput]);

  const onInputButtonClicked: CalculatorRenderProps['onInputButtonClicked'] = (input) => {
    if (input === '.') {
      if (currentSelectedCurrency !== Currencies.WEI && !currentInput.stringValue.includes('.')) {
        setCurrentInput((prev) => ({
          ...prev,
          stringValue: (prev.stringValue === 'ERROR' ? '' : prev.stringValue) + input,
        }));
      }
    } else {
      setCurrentInput((prev) => ({
        stringValue: (prev.stringValue === 'ERROR' ? '' : prev.stringValue) + input,
        currency: currentSelectedCurrency,
      }));
    }
  };
  const onCurrentInputChanged: CalculatorRenderProps['onCurrentInputChanged'] = (event) => {
    if (
      event.target.value === '' ||
      (validEthAndGweiNumberInput.test(event.target.value) && currentSelectedCurrency !== Currencies.WEI) ||
      (validWeiNumberInput.test(event.target.value) && currentSelectedCurrency === Currencies.WEI)
    ) {
      setCurrentInput({
        stringValue: event.target.value,
        currency: currentSelectedCurrency,
      });
    }
  };
  const onClearButtonClicked: CalculatorRenderProps['onClearButtonClicked'] = () => {
    if (currentInput.stringValue === '') {
      setCalculationHistory([]);
      setPreviousInput({
        stringValue: '',
        currency: currentSelectedCurrency,
      });
    } else {
      setCurrentInput({
        stringValue: '',
        currency: currentSelectedCurrency,
      });
    }
  };
  const onOperationClicked: CalculatorRenderProps['onOperationClicked'] = (operation) => {
    // Calculate value
    if (operation === '=') {
      if (selectedOperation !== undefined) {
        try {
          const result = calculate(previousInput, currentInput, selectedOperation);
          setCurrentInput({
            stringValue: weiToCurrencyString(result, currentSelectedCurrency),
            currency: currentSelectedCurrency,
          });
          setCalculationHistory((history) => [
            ...history,
            `${weiToCurrencyString(previousInput, currentSelectedCurrency)} ${Currencies[previousInput.currency]} ${selectedOperation} ${weiToCurrencyString(currentInput, currentSelectedCurrency)} ${Currencies[currentInput.currency]} = ${weiToCurrencyString(result, currentSelectedCurrency)} ${Currencies[currentSelectedCurrency]}`,
          ]);
          setPreviousInput({
            stringValue: weiToCurrencyString(result, currentSelectedCurrency),
            currency: currentSelectedCurrency,
          });
          setSelectedOperation(undefined);
        } catch {
          setCurrentInput({
            stringValue: 'ERROR',
            currency: Currencies.WEI,
          });
          setPreviousInput({
            stringValue: '',
            currency: Currencies.WEI,
          });
          setSelectedOperation(undefined);
        }
      }
    // If we have a pervious value and a selected operation set, then calculate the result with previous input
    } else if (previousInput.stringValue !== '' && selectedOperation !== undefined) {
      setPreviousInput({
        stringValue: '',
        currency: currentSelectedCurrency,
      });
      setSelectedOperation(undefined);
      try {
        const result = calculate(previousInput, currentInput, operation);
        setCurrentInput(result);
      } catch {
        setCurrentInput({
          stringValue: 'ERROR',
          currency: Currencies.WEI,
        });
        setPreviousInput({
          stringValue: '',
          currency: Currencies.WEI,
        });
      }
    // Set the previous input and reset next current input to do calculations on
    } else {
      setSelectedOperation(operation);
      setPreviousInput(currentInput);
      setCurrentInput({
        stringValue: '',
        currency: currentSelectedCurrency,
      });
    }
  };
  const onNegationClicked: CalculatorRenderProps['onNegationClicked'] = () => {
    setCurrentInput((prev) => ({
      stringValue: prev.stringValue[0] === '-' ? prev.stringValue.slice(1, prev.stringValue.length) : '-' + prev.stringValue,
      currency: currentSelectedCurrency,
    }));
  };

  return (
    <CalculatorRender
      currentInput={currentInput}
      currentSelectedCurrency={currentSelectedCurrency}
      convertOptions={convertOptions}
      calculationHistory={calculationHistory}
      onCurrentInputChanged={onCurrentInputChanged}
      onClearButtonClicked={onClearButtonClicked}
      onInputButtonClicked={onInputButtonClicked}
      onOperationClicked={onOperationClicked}
      onNegationClicked={onNegationClicked}
    />
  );
}

export type CalculatorInput = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '.';

export interface CalculatorRenderProps {
  currentInput: CalculationValue,
  currentSelectedCurrency: Currencies,
  convertOptions: CalculatorConvertButtonRenderProps[],
  calculationHistory: string[],
  onCurrentInputChanged: React.ChangeEventHandler<HTMLInputElement>,
  onClearButtonClicked: React.MouseEventHandler<HTMLButtonElement>,
  onInputButtonClicked: (input: CalculatorInput) => void,
  onOperationClicked: (operation: CalculatorOperationSupport) => void,
  onNegationClicked: React.MouseEventHandler<HTMLButtonElement>
}

/**
 * Renders the calculator structure and handle interactions
 * @param {CalculatorRenderProps} props Required props to render and interact with the calculator
 * @return {JSX.Element}
 */
export function CalculatorRender({
  currentInput,
  currentSelectedCurrency,
  convertOptions,
  calculationHistory,
  onCurrentInputChanged,
  onClearButtonClicked,
  onInputButtonClicked,
  onOperationClicked,
  onNegationClicked,
} : CalculatorRenderProps) {
  return (
    <div className={classnames(
      'flex',
      'flex-col',
      'lg:flex-row-reverse',
    )} style={{
      width: '100vw',
      height: '100vh',
    }}>
      <CalculatorOutputRender
        input={currentInput.stringValue}
        onInputChange={onCurrentInputChanged}
        convertOptions={convertOptions}
        calculationHistory={calculationHistory}
      />
      <div className={'flex flex-col space-y-2 p-4 bg-[#3C4564] items-center justify-center'}>
        <div className={'space-x-2'}>
          <CalculatorButton
            classNames={[
              'w-[136px]',
              'sm:w-[200px]',
            ]}
            type={'trinary'}
            textOrIcon={currentInput.stringValue === '' ? 'AC' : 'C'}
            onClick={onClearButtonClicked}
          />
          <CalculatorButton type={'trinary'} textOrIcon={'+/-'} onClick={onNegationClicked}/>
          <CalculatorButton type={'secondary'} textOrIcon={'÷'} onClick={() => {
            onOperationClicked('÷');
          }}/>
        </div>
        <div className={'space-x-2'}>
          {['7', '8', '9'].map((number) => (
            <CalculatorButton
              key={`calculator-button-${number}`}
              type={'primary'}
              textOrIcon={number}
              onClick={() => {
                onInputButtonClicked(number as CalculatorInput);
              }}
            />
          ))}
          <CalculatorButton
            type={'secondary'}
            textOrIcon={'×'}
            onClick={() => {
              onOperationClicked('×');
            }}
          />
        </div>
        <div className={'space-x-2'}>
          {['4', '5', '6'].map((number) => (
            <CalculatorButton
              key={`calculator-button-${number}`}
              type={'primary'}
              textOrIcon={number}
              onClick={() => {
                onInputButtonClicked(number as CalculatorInput);
              }}
            />
          ))}
          <CalculatorButton
            type={'secondary'}
            textOrIcon={'−'}
            onClick={() => {
              onOperationClicked('−');
            }}
          />
        </div>
        <div className={'space-x-2'}>
          {['1', '2', '3'].map((number) => (
            <CalculatorButton
              key={`calculator-button-${number}`}
              type={'primary'}
              textOrIcon={number}
              onClick={() => {
                onInputButtonClicked(number as CalculatorInput);
              }}
            />
          ))}
          <CalculatorButton
            type={'secondary'}
            textOrIcon={'+'}
            onClick={() => {
              onOperationClicked('+');
            }}
          />
        </div>
        <div className={'space-x-2'}>
          <CalculatorButton
            classNames={[
              'w-[136px]',
              'sm:w-[200px]',
            ]}
            type={'primary'}
            textOrIcon={'0'}
            onClick={() => {
              onInputButtonClicked('0');
            }}
          />
          <CalculatorButton
            classNames={[currentSelectedCurrency === Currencies.WEI ? 'opacity-50' : '']}
            type={'primary'}
            textOrIcon={'.'}
            onClick={() => {
              onInputButtonClicked('.');
            }}
          />
          <CalculatorButton
            type={'secondary'}
            textOrIcon={'='}
            onClick={() => {
              onOperationClicked('=');
            }}
          />
        </div>
      </div>
    </div>
  );
}
