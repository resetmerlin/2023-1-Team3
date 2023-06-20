import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterScreen from "./screens/register/RegisterScreen";
import MessageScreen from "./screens/MessageScreen";
import ConversationScreen from "./screens/ConversationScreen";
import "./sass/index.css";
import RequireAuth from "./components/RequireAuth";
import MissingPage from "./components/MissingPage";
import Unauthorized from "./components/Unauthorized";
import { Suspense, lazy } from "react";

import Loading from "./components/Loading";
const LoginSceen = lazy(() => import("./screens/login/LoginScreen"));
const HomeScreen = lazy(() => import("./screens/home/HomeScreen"));
const SaveScreen = lazy(() => import("./screens/SaveScreen"));
const SettingScreen = lazy(() => import("./screens/setting/SettingScreen"));
const AccountSettingScreen = lazy(() =>
  import("./screens/setting/accountSetting/AccountSettingScreen")
);
const PersonalInfoScreen = lazy(() =>
  import("./screens/setting/personalInfoEdit/PersonalInfoScreen")
);
function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="*" element={<MissingPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route
            path="/login"
            element={
              <Suspense fallback={<Loading />}>
                <LoginSceen />
              </Suspense>
            }
            exact
          ></Route>

          <Route path="/register" element={<RegisterScreen />} exact></Route>

          <Route element={<RequireAuth />}>
            <Route
              path="/"
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
              path="/save"
              element={
                <Suspense fallback={<Loading />}>
                  <SaveScreen />
                </Suspense>
              }
              exact
            ></Route>
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/message" element={<MessageScreen />} exact></Route>
          </Route>

          <Route element={<RequireAuth />}>
            <Route
              path="/conversation"
              element={<ConversationScreen />}
              exact
            ></Route>
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="/setting">
              <Route
                path=""
                element={
                  <Suspense fallback={<Loading />}>
                    <SettingScreen />
                  </Suspense>
                }
                exact
              ></Route>

              <Route
                path="/setting/account-security"
                element={
                  <Suspense fallback={<Loading />}>
                    <AccountSettingScreen />
                  </Suspense>
                }
                exact
              ></Route>

              <Route
                path="/setting/personal-info"
                element={
                  <Suspense fallback={<Loading />}>
                    <PersonalInfoScreen />
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
