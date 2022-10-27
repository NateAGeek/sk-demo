import { createContext, useContext, useState } from "react";

function initializeCalculatorContextStore() {
    const [calculatorInputValue, setCalculatorInputValue] = useState("");
    const [previousValue, setPreviousValue] = useState("");
    return {
        calculatorInputValue,
        setCalculatorInputValue,
        previousValue,
        setPreviousValue
    }
}

type CalculatorContextStore = ReturnType<typeof initializeCalculatorContextStore>;

const CalculatorContextStore = createContext<CalculatorContextStore | null>(null);

export function useCalculatorContext() {
    const context = useContext(CalculatorContextStore);
    if (context === null) {
        throw 'CalculatorContextProvider not properly setup or provided';
    }
    return context;
}

export interface CalculatorContextProviderProps {
    children?: React.ReactNode;
}

export function CalculatorContextProvider({children}: CalculatorContextProviderProps) {
    return (
        <CalculatorContextStore.Provider value={initializeCalculatorContextStore()}>
            {children}
        </CalculatorContextStore.Provider>
    );
}