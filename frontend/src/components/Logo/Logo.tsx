import './Logo.scss';

export function LogoLargeSize() {
  return (
    <div className="logo__wrap">
      <img src="/logo.svg" alt="logo-white" className="logo-img__large" />
    </div>
  );
}
export function LogoMediumImg() {
  return <img src="/logo.svg" alt="logo-white" className="logo-img__medium" />;
}

export function LogoMediumSize() {
  return (
    <div className="logo__wrap">
      <LogoMediumImg />
    </div>
  );
}
