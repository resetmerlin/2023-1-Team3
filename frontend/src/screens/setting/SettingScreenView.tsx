import { Link } from 'react-router-dom';

type Props = {
  memberId: number;
  name: string;
  imgSrc: string;
  department: string;
  age: number;
  introduction: string;
};
export default function SettingScreenView({
  memberId,
  name,
  imgSrc,
  department,
  age,
  introduction,
  logoutHandler,
  getPopupStateFromChild,
}: Props) {
  return (
    <>
      <label htmlFor="my-card" className="setting__user-content">
        <img
          key={memberId}
          src={imgSrc}
          loading="lazy"
          alt="mypage-profile"
          className="setting__user-content__profile"
        />
        <input
          type="checkbox"
          onChange={getPopupStateFromChild}
          id="my-card"
          style={{ display: 'none' }}
        />
        <div className="setting__user-content__text-wrap">
          <div className="setting__user-content__title-wrap">
            <div className="setting__user-content__name">{name}</div>
            {age}
          </div>

          <span className="setting__user-content__department">
            {department}
          </span>
        </div>
      </label>
      <div className="setting__description-content">
        <span>자기소개</span>
        <p>{introduction}</p>
      </div>
      <div className="setting__account-content">
        <Link to="/setting/personal-info">프로필 설정</Link>

        <Link to="/setting/account-security">계정보안 설정</Link>
        <Link>문의</Link>
      </div>

      <div className="setting__last-content">
        <button
          type="button"
          className="setting__button"
          onClick={logoutHandler}
        >
          계정에서 로그아웃
        </button>
        <Link to="/setting/account-management" className="setting__button">
          계정에서 탈퇴
        </Link>
      </div>
    </>
  );
}
