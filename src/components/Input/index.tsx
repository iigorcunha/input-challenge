import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState, FocusEvent } from "react"
import { convertStringToNumber } from "../../lib/convertStringToNumber";
import { formatCurrency } from "../../lib/formatCurrency";
import { FiAlertCircle } from 'react-icons/fi';
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
} from "./styles"

const mortgage = {
  interest_rate: 0.016
}

export const Input = () => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [inputError, setInputError] = useState('');
  const [previousValue, setPreviousValue] = useState('$100,000');
  const [valueWithInterest, setValueWithInterest] = useState('');

  const [cursorPos, setCursorPos] = useState({
    selectionStart: 0,
    selectionEnd: 0,
  })
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.setSelectionRange(cursorPos.selectionStart, cursorPos.selectionEnd);
    }
  }, [cursorPos])


  function handleKeyboardSubmit(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === 'Tab') {
      if (value.length === 0) {
        setInputError('The value cannot be empty.')
      } else {
        setPreviousValue(e.currentTarget.value);

        const numberValue = convertStringToNumber(e.currentTarget.value);
        const finalValue = numberValue * (1 + mortgage.interest_rate)
        setValueWithInterest(formatCurrency(finalValue));
        setInputError('');
      }
    } else if (e.key === 'Escape') {
      inputRef.current?.blur()
      setValueWithInterest('');
      setInputError('');
    }
  }

  function handleOnBlurSubmit(e: FocusEvent<HTMLInputElement>) {
    if (value.length === 0) {
      setInputError('The value cannot be empty.')
    } else {
      setPreviousValue(e.currentTarget.value);

    const numberValue = convertStringToNumber(e.currentTarget.value);
    const finalValue = numberValue * (1 + mortgage.interest_rate)
    setValueWithInterest(formatCurrency(finalValue));

    setInputError('')
    }

    setIsFocused(false);
  }

  function handleValue(e: ChangeEvent<HTMLInputElement>): void {
      if (e.currentTarget.value.length === 23) {
        setInputError('You reached the maximum number of digits.');
        return;
      }
      // Remove all characters that is not a number;
      const numberValue = convertStringToNumber(e.currentTarget.value)

      // Format value in Canadian Dollar without decimals.
      const formattedValue = formatCurrency(numberValue)

       if (numberValue === 0) {
        setValue('');
       } else {
        setValue(formattedValue)
       }
      
      // Check if selectionStart and selectionEnd are not null
      if (e.currentTarget.selectionStart !== null && e.currentTarget.selectionEnd !== null) {
        // check if the commas is removed.
        if (e.currentTarget.value.length === formattedValue.length - 1) {
            setCursorPos({
              selectionStart: e.currentTarget.selectionStart + 1,
              selectionEnd: e.currentTarget.selectionEnd + 1
            })
          

            // check if a comma is added.
        } else if (e.currentTarget.value.length === formattedValue.length + 1) {
          
          // Check if the position is the first to avoid cursor go before the dollar symbol
          if (e.currentTarget.selectionEnd === 1) {
            setCursorPos({
              selectionStart: e.currentTarget.selectionStart,
              selectionEnd: e.currentTarget.selectionEnd
            })
          } else {
            setCursorPos({
              selectionStart: e.currentTarget.selectionStart - 1,
              selectionEnd: e.currentTarget.selectionEnd - 1
            })
          }
        } else {
          setCursorPos({
            selectionStart: e.currentTarget.selectionStart,
            selectionEnd: e.currentTarget.selectionEnd
          })
        }
      }
     
    
  }

  function handleFocus() {
    inputRef.current?.focus();

    setIsFocused(true);

    setValue('');
    setValueWithInterest('');
  }

  return (
    <Container>
      <LabelContainer>
        <Title>Mortgage</Title>
        <Button>Regular</Button>
      </LabelContainer>
      <InputBase
        ref={inputRef}
        isFocused={isFocused}
        name="mortgage"
        type="text"
        onBlur={handleOnBlurSubmit}
        onClick={handleFocus}
        placeholder={previousValue}
        value={value} 
        onKeyDown={handleKeyboardSubmit}
        onChange={handleValue}/>

    
      {inputError.length > 0 && 
     
        ( <ErrorContainer>
        
          <FiAlertCircle color={"#ff3636"} size={14} />
          <ErrorLabel>{inputError}</ErrorLabel>
        
        </ErrorContainer>)}
    
      
    {valueWithInterest 
      && (<InputResultContainer>
        <InputResult>{valueWithInterest}</InputResult>
      </InputResultContainer>)}

    </Container>
  )
}