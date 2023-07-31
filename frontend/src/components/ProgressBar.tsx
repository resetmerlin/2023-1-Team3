import { styled } from 'styled-components';

export default function ProgressBar({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <ProgressBarWrap>
      <Progress style={{ width: `${progress}%` }} />
    </ProgressBarWrap>
  );
}
const ProgressBarWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: start;
  background-color: #b1b1b1;
`;
const Progress = styled.div`
  width: 25%;
  position: absolute;
  left: 0;
  height: 0.7rem;
  background-color: rgb(128, 113, 252);
`;
