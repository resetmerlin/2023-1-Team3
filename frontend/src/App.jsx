import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen";
import LoginSceen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import MessageScreen from "./screens/MessageScreen";
import ConversationScreen from "./screens/ConversationScreen";
import Header from "./components/Header";
import { useMediaQuery } from "react-responsive";
import "./sass/index.css";

function App() {
  const isMobile = useMediaQuery({
    minWidth: 320,
    maxWidth: 599,
  });
  return (
    <BrowserRouter>
      <div className="container">
        {isMobile && <Header />}

        <Routes>
          <Route path="/" element={<HomeScreen />} exact></Route>

          <Route path="/message" element={<MessageScreen />} exact></Route>
          <Route
            path="/conversation"
            element={<ConversationScreen />}
            exact
          ></Route>

          <Route path="/login" element={<LoginSceen />} exact></Route>

          <Route path="/register" element={<RegisterScreen />} exact></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
