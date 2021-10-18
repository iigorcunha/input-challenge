import styled from 'styled-components';

interface InputBaseProps {
  isFocused: boolean;
}

export const Container = styled.div`
  display: flex;
  width: 16rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LabelContainer = styled.div`
  display: flex;
  padding: 0.75rem;
  padding-right: 0;
  padding-left: 0;
  width: calc(100% + 1.5rem);
  justify-content: space-between;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.span`
  font-weight: 600;
  margin-right: 0.375rem;
  color: #343a40;
`;

export const Button = styled.button`
  background-color: transparent;
  border: none;
  text-decoration: underline;
  cursor: pointer;
  color: #495057;

  &:active {
    color: #adb5bd;
  }

  &:hover {
    color: #212529;
    filter: brightness(0.8, #2b9348);
  }
`;

export const InputResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.75rem;
  align-items: flex-end;
  justify-content: center;
  width: calc(100% + 1.5rem);
`;

export const InputResult = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

export const ErrorContainer = styled.div`
  width: calc(100% + 1.5rem);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 1.5rem;
`;

export const ErrorLabel = styled.span`
  font-size: 0.75rem;
  margin-left: 0.375rem;
  font-weight: 600;
  color: #ff3636;
  text-align: center;
`;

export const InputBase = styled.input<InputBaseProps>`
  padding: 0.75rem;
  width: 100%;
  height: 1.75rem;
  font-size: 1rem;
  border-radius: 5px;
  outline: none;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ isFocused }) => isFocused ? '#2b9348' : '#343a40'}

`;