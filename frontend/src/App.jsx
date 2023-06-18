import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterScreen from "./screens/register/RegisterScreen";
import LoginSceen from "./screens/login/LoginScreen";
import HomeScreen from "./screens/home/HomeScreen";
import MessageScreen from "./screens/MessageScreen";
import ConversationScreen from "./screens/ConversationScreen";
import { useMediaQuery } from "react-responsive";
import SaveScreen from "./screens/SaveScreen";
import SettingScreen from "./screens/setting/SettingScreen";
import "./sass/index.css";
import RequireAuth from "./components/RequireAuth";
import MissingPage from "./components/MissingPage";
import Unauthorized from "./components/Unauthorized";
import AccountSettingScreen from "./screens/setting/accountSetting/AccountSettingScreen";
import PersonalInfoScreen from "./screens/setting/personalInfoEdit/PersonalInfoScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="*" element={<MissingPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="/login" element={<LoginSceen />} exact></Route>

          <Route path="/register" element={<RegisterScreen />} exact></Route>

          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomeScreen />} exact></Route>
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/save" element={<SaveScreen />} exact></Route>
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
              <Route path="" element={<SettingScreen />} />

              <Route
                path="/setting/account-security"
                element={<AccountSettingScreen />}
              ></Route>

              <Route
                path="/setting/personal-info"
                element={<PersonalInfoScreen />}
              ></Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
