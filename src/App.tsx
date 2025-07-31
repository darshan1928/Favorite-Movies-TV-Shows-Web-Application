import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CreateOrEdit from "./pages/CreateOrEdit";
import ProtectedLayout from "./components/ProtectedLayout";
import Profile from "./pages/Profile";
import { useAuth } from "@/context/auth-context";
export default function App() {
const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        {isLoggedIn ? (
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateOrEdit />} />
            <Route path="/edit/:id" element={<CreateOrEdit />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}
