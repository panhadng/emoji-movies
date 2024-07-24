import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
  width: 100%;
  align-items: center;
`;

export const EmojisWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 5rem;
`;

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  justify-content: space-between;
  align-items: center;
`;

export const HintsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  color: darkred;
`;

export const TimeBar = styled.div`
  width: 100%;
  background-color: #ddd;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
  height: 1.5rem;
  margin: 1rem 0;
`;

export const TimeBarFill = styled.div`
  height: 100%;
  width: 0; /* Initially empty */
  transition: width 1s linear, background-color 1s linear;
  background-color: green;
`;
