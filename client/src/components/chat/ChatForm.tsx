import styled from 'styled-components';

export const ChatForm = styled.form`
  position: absolute;
  bottom: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  padding: 6px;
  background-color: #444;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const ChatFormTextarea = styled.textarea`
  font-size: 12px;
  height: 100%;
  border: 0;
  outline: 0;
  background-color: inherit;
  color: #fff;
  flex: 1;
  padding: 5px;
`;
export const ChatFormButton = styled.button`
  width: 65px;
  height: 60px;
  font-size: 10px;
  border-radius: 3px;
  border: 1px solid black;
  &:active {
    opacity: 0.7;
  }
`;
