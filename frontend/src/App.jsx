import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterScreen from './screens/register/RegisterScreen';
import './sass/index.scss';
import RequireAuth from './components/RequireAuth';
import MissingPage from './components/MissingPage';
import Unauthorized from './components/Unauthorized';
import { Suspense, lazy, useEffect } from 'react';
import ConversationScreen from './screens/conversation/ConversationScreen';
import Loading from './components/Loading';
import MessageScreen from './screens/message/MessageScreen';
import DesktopBlock from './components/DesktopBlock';
import AccountResignScreen from './screens/account/AccountResignScreen';
const LoginSceen = lazy(() => import('./screens/login/LoginScreen'));
const HomeScreen = lazy(() => import('./screens/home/HomeScreen'));
const SaveScreen = lazy(() => import('./screens/save/SaveScreen'));
const SettingScreen = lazy(() => import('./screens/setting/SettingScreen'));
const SecurityEditScreen = lazy(() =>
  import('./screens/securityEdit/accountSetting/SecurityEditScreen')
);
const ProfileEditScreen = lazy(() =>
  import('./screens/profileEdit/personalInfoEdit/ProfileEditScreen')
);

function App() {
  let vh = 0;

  useEffect(() => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);
  return (
    <BrowserRouter>
      <div className='container'>
        <DesktopBlock />
        <Routes>
          <Route path='*' element={<MissingPage />} />
          <Route path='/unauthorized' element={<Unauthorized />} />

          <Route
            path='/login'
            element={
              <Suspense fallback={<Loading />}>
                <LoginSceen />
              </Suspense>
            }
            exact
          ></Route>

          <Route path='/register' element={<RegisterScreen />} exact></Route>

          <Route element={<RequireAuth />}>
            <Route
              path='/'
              element={
                <Suspense fallback={<Loading />}>
                  <HomeScreen />
                </Suspense>
              }
              exact
            ></Route>
          </Route>
          <Route element={<RequireAuth />}>
            <Route
              path='/save'
              element={
                <Suspense fallback={<Loading />}>
                  <SaveScreen />
                </Suspense>
              }
              exact
            ></Route>
          </Route>
          <Route element={<RequireAuth />}>
            <Route path='/message'>
              <Route path='' element={<MessageScreen />} exact />
              <Route path=':id' element={<ConversationScreen />} exact />
            </Route>
          </Route>

          <Route element={<RequireAuth />}>
            <Route path='/setting'>
              <Route
                path=''
                element={
                  <Suspense fallback={<Loading />}>
                    <SettingScreen />
                  </Suspense>
                }
                exact
              ></Route>

              <Route
                path='/setting/account-security'
                element={
                  <Suspense fallback={<Loading />}>
                    <SecurityEditScreen />
                  </Suspense>
                }
                exact
              ></Route>

              <Route
                path='/setting/personal-info'
                element={
                  <Suspense fallback={<Loading />}>
                    <ProfileEditScreen />
                  </Suspense>
                }
                exact
              ></Route>

              <Route
                path='/setting/account-management'
                element={
                  <Suspense fallback={<Loading />}>
                    <AccountResignScreen />
                  </Suspense>
                }
                exact
              ></Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
