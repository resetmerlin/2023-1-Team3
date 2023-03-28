import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen";
import LoginSceen from "./screens/LoginScreen";
function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/login" element={<LoginSceen />} exact></Route>

          <Route path="/register" element={<RegisterScreen />} exact></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
