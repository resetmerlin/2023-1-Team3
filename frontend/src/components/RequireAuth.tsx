import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authToken } from '../hooks/MemoizedRedux';

export default function RequireAuth() {
  const auth = useSelector(authToken);
  const location = useLocation();

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {auth ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
}
