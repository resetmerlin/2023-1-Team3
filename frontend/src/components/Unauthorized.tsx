import { useNavigate } from 'react-router-dom';
import { ErrorPageContent, ErrorPageWrap, NumberError } from './Error';

export default function Unauthorized() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <ErrorPageWrap>
      <NumberError>Unauthorized</NumberError>
      <ErrorPageContent>
        이 페이지에 접속할 수 있는 권한이 없습니다.
      </ErrorPageContent>
      <button onClick={goBack} type="button">
        Go Back
      </button>
    </ErrorPageWrap>
  );
}
