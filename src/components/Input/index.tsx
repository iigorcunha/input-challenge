import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { FiAlertCircle, FiInfo } from 'react-icons/fi';
import { convertStringToNumber } from '../../lib/convertStringToNumber';
import { formatCurrency } from '../../lib/formatCurrency';
import {
  Container,
  InputBase,
  LabelContainer,
  Title,
  Button,
  InputResult,
  ErrorContainer,
  ErrorLabel,
  InputResultContainer,
  TitleContainer,
} from './styles';

const mortgage = {
  interest_rate: 0.016,
};

export const Input = (): JSX.Element => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [inputError, setInputError] = useState('');
  const [previousValue, setPreviousValue] = useState('$100,000');
  const [valueWithInterest, setValueWithInterest] = useState('');

  const [cursorPos, setCursorPos] = useState({
    selectionStart: 0,
    selectionEnd: 0,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.setSelectionRange(
        cursorPos.selectionStart,
        cursorPos.selectionEnd
      );
    }
  }, [cursorPos]);

  useEffect(() => {
    if (value.length === 0) {
      setValueWithInterest('');
      setInputError('');
    }
  }, [value.length]);

  function calculateInterestRate(val: string): void {
    setTimeout(() => {
      const numberValue = convertStringToNumber(val);
      const finalValue = numberValue * (1 + mortgage.interest_rate);
      setValueWithInterest(formatCurrency(finalValue));
    }, 100);
  }

  function handleKeyboardSubmit(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter' || e.key === 'Tab') {
      if (value.length === 0) {
        setInputError('The value cannot be empty.');
      } else {
        setPreviousValue(e.currentTarget.value);
        calculateInterestRate(e.currentTarget.value);
        setInputError('');
        setIsFocused(false);
        inputRef.current?.blur();
      }
    } else if (e.key === 'Escape') {
      inputRef.current?.blur();
      setValue('');
      setValueWithInterest('');
      setInputError('');
      setIsFocused(false);
    }
  }

  function handleValue(e: ChangeEvent<HTMLInputElement>): void {
    if (e.currentTarget.value.length >= 23) {
      setInputError('The maximum is 16 digits.');
      return;
    }

    // Remove all characters that are not a number;
    const numberValue = convertStringToNumber(e.currentTarget?.value);

    // Format value in Canadian Dollar without decimals.
    const formattedValue = formatCurrency(numberValue);

    // To avoid show $0
    if (numberValue === 0) {
      setValue('');
    } else {
      setValue(formattedValue);
    }
    // Check if selectionStart and selectionEnd are not null
    if (
      e.currentTarget.selectionStart !== null &&
      e.currentTarget.selectionEnd !== null
    ) {
      // check if the commas is removed.
      if (e.currentTarget.value.length === formattedValue.length - 1) {
        setCursorPos({
          selectionStart: e.currentTarget.selectionStart + 1,
          selectionEnd: e.currentTarget.selectionEnd + 1,
        });
        // check if a comma is added.
      } else if (e.currentTarget.value.length === formattedValue.length + 1) {
        // Check if the position is the first to avoid cursor go before the dollar symbol
        if (e.currentTarget.selectionStart === 1) {
          setCursorPos({
            selectionStart: e.currentTarget.selectionStart,
            selectionEnd: e.currentTarget.selectionEnd,
          });
        } else {
          setCursorPos({
            selectionStart: e.currentTarget.selectionStart - 1,
            selectionEnd: e.currentTarget.selectionEnd - 1,
          });
        }
      } else if (e.currentTarget.value.length === formattedValue.length) {
        setCursorPos({
          selectionStart: e.currentTarget.selectionStart,
          selectionEnd: e.currentTarget.selectionEnd,
        });
      } else {
        setCursorPos({
          selectionStart: formattedValue.length,
          selectionEnd: formattedValue.length,
        });
      }
    }
  }

  function handleFocus(): void {
    // onClick set to focused and clear values;
    setIsFocused(true);

    setValue('');
    setValueWithInterest('');
  }

  useEffect(() => {
    // Listen every click on page and check if the inputRef is the same as target;
    document.addEventListener('mousedown', e => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        if (inputRef.current?.value.length > 0) {
          setPreviousValue(inputRef.current?.value);
          calculateInterestRate(inputRef.current?.value);
        }

        setInputError('');
        setIsFocused(false);
      }
    });
  }, [inputRef]);

  return (
    <Container>
      <LabelContainer>
        <TitleContainer>
          <Title>Mortgage</Title>
          <FiInfo size={16} color="#343a40" />
        </TitleContainer>
        <Button>Regular</Button>
      </LabelContainer>
      <InputBase
        ref={inputRef}
        isFocused={isFocused}
        name="mortgage"
        type="text"
        onClick={() => handleFocus()}
        placeholder={previousValue}
        value={value}
        onKeyDown={e => handleKeyboardSubmit(e)}
        onChange={e => handleValue(e)}
      />

      {inputError.length > 0 && (
        <ErrorContainer>
          <FiAlertCircle color="#ff3636" size={14} />
          <ErrorLabel>{inputError}</ErrorLabel>
        </ErrorContainer>
      )}

      {valueWithInterest && (
        <InputResultContainer>
          <InputResult>{valueWithInterest}</InputResult>
        </InputResultContainer>
      )}
    </Container>
  );
};
