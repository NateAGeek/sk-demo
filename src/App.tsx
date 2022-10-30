import { add, dinero } from 'dinero.js';
import './App.css'
import CalculatorButton from './components/CalculatorButton/CalculatorButton';
import { useCalculatorContext } from './state/CalculatorContext'
import { currencyFormat, dineroBigint, ETH, toStringFormat } from './utils/Currencies';
import classnames from 'classnames';
import { CalculatorOutputRender } from './components/CalculatorOutput/CalculatorOutput';

function App() {
  const {calculatorInputValue, setCalculatorInputValue, previousValue, setPreviousValue} = useCalculatorContext();
  const current_currency = ETH;

  return (
    <div className={classnames(
      'flex',
      'flex-col'
    )} style={{
      width: '100vw',
      height: '100vh'
    }}>
      <CalculatorOutputRender
        output={'123.12'}
        convertOptions={[
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
        ]}
        historyCalculations={[
          '123 + 32 = 155',
          '123 + 32 = 155',
          '123 + 32 = 155',
          '123 + 32 = 155',
        ]}
      />
      <div className={'flex flex-col flex-grow space-y-2 p-4  bg-[#3C4564] items-center justify-center'}>
        <div className={'space-x-2'}>
          <CalculatorButton type={'trinary'} textOrIcon={'AC'} onClick={() => {}}/>
          <CalculatorButton type={'trinary'} textOrIcon={'+/-'} onClick={() => {}}/>
          <CalculatorButton type={'trinary'} textOrIcon={'%'} onClick={() => {}}/>
          <CalculatorButton type={'secondary'} textOrIcon={'÷'} onClick={() => {}}/>
        </div>
        <div className={'space-x-2'}>
          <CalculatorButton type={'primary'} textOrIcon={'7'} onClick={() => {}}/>
          <CalculatorButton type={'primary'} textOrIcon={'8'} onClick={() => {}}/>
          <CalculatorButton type={'primary'} textOrIcon={'9'} onClick={() => {}}/>
          <CalculatorButton type={'secondary'} textOrIcon={'×'} onClick={() => {}}/>
        </div>
        <div className={'space-x-2'}>
          <CalculatorButton type={'primary'} textOrIcon={'4'} onClick={() => {}}/>
          <CalculatorButton type={'primary'} textOrIcon={'5'} onClick={() => {}}/>
          <CalculatorButton type={'primary'} textOrIcon={'6'} onClick={() => {}}/>
          <CalculatorButton type={'secondary'} textOrIcon={'−'} onClick={() => {}}/>
        </div>
        <div className={'space-x-2'}>
          <CalculatorButton type={'primary'} textOrIcon={'1'} onClick={() => {}}/>
          <CalculatorButton type={'primary'} textOrIcon={'2'} onClick={() => {}}/>
          <CalculatorButton type={'primary'} textOrIcon={'3'} onClick={() => {}}/>
          <CalculatorButton type={'secondary'} textOrIcon={'+'} onClick={() => {}}/>
        </div>
        <div className={'space-x-2'}>
          <CalculatorButton classNames={[
            'w-[136px]',
            // 'sm:w-[200px]'
          ]} type={'primary'} textOrIcon={'0'} onClick={() => {}}/>
          <CalculatorButton type={'primary'} textOrIcon={'.'} onClick={() => {}}/>
          <CalculatorButton type={'secondary'} textOrIcon={'='} onClick={() => {}}/>
        </div>
      </div>
    </div>
  )
}

export default App
