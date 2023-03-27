import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/register" element={<RegisterScreen />} exact></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
