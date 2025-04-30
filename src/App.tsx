import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegistrationPage from "./pages/RegistrationPage";
import CharacterCreation from "./components/CharacterCreation";
import MainContent from "./components/MainContent";
import ChatScreen from "./components/ChatScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<MainPage />}>
          <Route index element={<Navigate to="/main" replace />} />
          <Route path="main" element={<MainContent />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/character/:id" element={<ChatScreen />} />
            <Route path="create-character" element={<CharacterCreation />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/main" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
