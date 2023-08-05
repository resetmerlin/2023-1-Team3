import { Link, useNavigate } from 'react-router-dom';
import './Error.scss';

export function Unauthorized() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div className="error-page__wrap">
      <span className="error-page__title">Unauthorized</span>
      <div className="error-page__subtitle__wrap">
        이 페이지에 접속할 수 있는 권한이 없습니다.
      </div>
      <button onClick={goBack} type="button">
        Go Back
      </button>
    </div>
  );
}

export function ServerError({ error }) {
  return (
    <div className="error-page">
      <div className="error-page__wrap">
        <span className="error-page__title">404</span>
        <div className="error-page__subtitle__wrap">
          <span>{error}</span>
        </div>
      </div>
      <img className="error-page__logo" src="/404.svg" alt="404" />
    </div>
  );
}

export function PageNotFound() {
  return (
    <div className="error-page">
      <div className="error-page__wrap">
        <div>
          <Link to="/">
            <span className="error-page__home-link">
              <box-icon
                type="solid"
                name="home"
                color="#8071fc"
                size="3.3rem"
              />
            </span>
          </Link>
          <span className="error-page__title">404</span>
        </div>

        <div className="error-page__subtitle__wrap">
          <span>페이지를</span>
          <span>찾을 수 없습니다.</span>
        </div>
        <p className="error-page__paragraph">
          페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다. 입력하신 주소가
          정확한지 다시 확인해 주시기 바랍니다.
        </p>
      </div>

      <img className="error-page__logo" src="/404.svg" alt="404" />
    </div>
  );
}
